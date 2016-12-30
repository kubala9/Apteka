import tpl from '../views/ObslugaProduktow.html';
import formularz from '../views/_formularzProduktow.html';

class ObslugaProduktow {

  constructor($scope, $mdDialog, Produkt) {
    this.produkty = Produkt.pobierz();

    //dodawanie/edytowanie pracowników
    let zapisano = produkt => {
      return $mdDialog.alert()
          .title(produkt.nazwa + ' został dodany do bazy produktów!')
          .ok('Ok!');
    };
    let niezapisano = produkt => {
      return $mdDialog.alert()
          .title('Produkt ' + produkt.nazwa + ' NIE został dodany do bazy produktów! Sprawdź czy taki produkt nie istnieje już w bazie.')
          .ok('Ok!');
    };
    let modyfikowanie = ($scope, $mdDialog, produkt) => {
      if (typeof produkt !== "undefined") {
        $scope.produkt = Object.assign({}, produkt);
      } else {
        $scope.produkt = {
                 nazwa: '',
                opis: '', 
                cena: '', 
                stan: 0,
                recepta: true, 
                refundacja: 0,
                dostepnosc: false
            };
        }

      $scope.closeDialog = () => {
        $mdDialog.hide();
      };

      $scope.save = () => {
        produkt = $scope.produkt;

        if (produkt.id) {
          if (Produkt.edytuj(produkt)) {
            $mdDialog.show(zapisano(produkt));
          } else {
            $mdDialog.show(niezapisano(produkt));
          }
        } else {
          if (Produkt.nowy(produkt)) {
            $mdDialog.show(zapisano(produkt));
          } else {
            $mdDialog.show(niezapisano(produkt));
          }
        }
      };
    };
    this.modyfikacja = function modyfikacja(produkt) {
      $mdDialog.show({
        template: formularz,
        locals: {produkt}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    //usuwanie pracowników
    var usunieto = produkt => {
      return $mdDialog.alert()
          .title('Produkt ' + produkt.nazwa + ' został usunięty!')
          .ok('Ok!');
    };
    let nieusunieto = produkt => {
      return $mdDialog.alert()
          .title('Produkt ' + produkt.nazwa + ' NIE został usunięty z bazy produktów!')
          .ok('Ok!');
    };
    let potwierdzUsuniecie = produkt => {
      return $mdDialog.confirm()
          .title('Czy chcesz usunąć produkt ' + produkt.nazwa + '?')
          .ok('Tak')
          .cancel('Nie');
    };
    this.usun = function usun(produkt) {
      $mdDialog
          .show(potwierdzUsuniecie(produkt))
          .then(function() {
            if (Produkt.usun(produkt)) {
              $mdDialog.hide();
              $mdDialog.show(usunieto(produkt));
            } else {
              $mdDialog.hide();
              $mdDialog.show(nieusunieto(produkt));
            }
          }, function() {
            $mdDialog.hide();
            $mdDialog.show(nieusunieto(produkt));
          });
    };
  }
}

export const obslugaproduktow = {
  template: tpl,
  controller: ObslugaProduktow
};
