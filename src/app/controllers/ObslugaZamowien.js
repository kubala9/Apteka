import tpl from '../views/ObslugaZamowien.html';
import formularz from '../views/_formularzProduktow.html';

class ObslugaZamowien {

  constructor($scope, $mdDialog, Produkt, Kupujacy, Zamowienie) {
    this.produkty = Produkt.pobierz();
    this.koszyk=Zamowienie.pobierz();
   //dodawanie/edytowanie pracowników
    let zapisano = zamowienie => {
      return $mdDialog.alert()
          .title('Dodano do koszyka!')
          .ok('Ok!');
    }; 
    let niezapisano = zamowienie => {
      return $mdDialog.alert()
          .title('Nie dodano do koszyka, spróbuj ponownie!')
          .ok('Ok!');
    };
    let nowy = ($scope, $mdDialog, zamowienie) => {
      if (typeof zamowienie !== "undefined") {
        $scope.zamowienie = Object.assign({}, zamowienie);
      } else {
        $scope.zamowienie = {
          produkt: 0,
          ilosc: 0   
        };
      }

      $scope.closeDialog = () => {
        $mdDialog.hide();
      };

      $scope.save = () => {
        zamowienie = $scope.zamowienie;
          
       if (Zamowienie.nowy(zamowienie)) {
            $mdDialog.show(zapisano(zamowienie));
          } else {
            $mdDialog.show(niezapisano(zamowienie));
          }
        };
      };
    this.potwierdzenie = function potwierdzenie(zamowienie) {
      $mdDialog.show({
        template: formularz,
        locals: {zamowienie}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: potwierdzenie
      });
    };

    //usuwanie produktu z koszyka
    this.usun = function usun(zamowienie) {
      Zamowienie.usun(zamowienie);
    };
  }
}
export const obslugazamowien = {
  template: tpl,
  controller: ObslugaZamowien
};
