import tpl from '../views/ObslugaSprzedajacy.html';
import formularz from '../views/_formularzSprzedajacy.html';

class ObslugaSprzedajacy {

  constructor($scope, $mdDialog, Sprzedajacy) {
    this.sprzedawcy = Sprzedajacy.pobierz();

    //dodawanie/edytowanie pracowników
    let zapisano = sprzedawca => {
      return $mdDialog.alert()
          .title('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' został zapisany!')
          .ok('Rozumiem, dzięki');
    };
    let niezapisano = sprzedawca => {
      return $mdDialog.alert()
          .title('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' nie został zapisany!')
          .ok('Rozumiem, dzięki');
    };
    let modyfikowanie = ($scope, $mdDialog, sprzedawca) => {
      if (typeof sprzedawca !== "undefined") {
        $scope.sprzedawca = Object.assign({}, sprzedawca);
        $scope.sprzedawca.haslo = '';
      } else {
        $scope.sprzedawca = {
          'imie': '',
          'nazwisko': '',
          'pesel': '',
          'haslo': ''
        };
      }

      $scope.closeDialog = () => {
        $mdDialog.hide();
      };

      $scope.save = () => {
        sprzedawca = $scope.sprzedawca;

        if (sprzedawca.id) {
          if (Sprzedajacy.edytuj(sprzedawca)) {
            $mdDialog.show(zapisano(sprzedawca));
          } else {
            $mdDialog.show(niezapisano(sprzedawca));
          }
        } else {
          if (Sprzedajacy.nowy(sprzedawca)) {
            $mdDialog.show(zapisano(sprzedawca));
          } else {
            $mdDialog.show(niezapisano(sprzedawca));
          }
        }
      };
    };
    this.modyfikacja = function modyfikacja(sprzedawca) {
      $mdDialog.show({
        template: formularz,
        locals: {sprzedawca}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    //usuwanie pracowników
    var usunieto = sprzedawca => {
      return $mdDialog.alert()
          .title('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' został usunięty!')
          .ok('Rozumiem, dzięki');
    };
    let nieusunieto = sprzedawca => {
      return $mdDialog.alert()
          .title('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' nie został usunięty!')
          .ok('Rozumiem, dzięki');
    };
    let potwierdzUsuniecie = sprzedawca => {
      return $mdDialog.confirm()
          .title('Czy chcesz usunąć sprzedawcę ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + '?')
          .ok('Tak')
          .cancel('Nie');
    };
    this.usun = function usun(sprzedawca) {
      $mdDialog
          .show(potwierdzUsuniecie(sprzedawca))
          .then(function() {
            if (Sprzedajacy.usun(sprzedawca)) {
              $mdDialog.hide();
              $mdDialog.show(usunieto(sprzedawca));
            } else {
              $mdDialog.hide();
              $mdDialog.show(nieusunieto(sprzedawca));
            }
          }, function() {
            $mdDialog.hide();
            $mdDialog.show(nieusunieto(sprzedawca));
          });
    };
  }
}

export const obslugasprzedajacy = {
  template: tpl,
  controller: ObslugaSprzedajacy
};
