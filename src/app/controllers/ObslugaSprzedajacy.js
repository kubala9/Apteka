import tpl from '../views/ObslugaSprzedajacy.html';
import formularz from '../views/_formularzSprzedajacy.html';

class ObslugaSprzedajacy {

  constructor($scope, $mdDialog, Sprzedajacy) {
    this.sprzedawcy = Sprzedajacy.pobierz();

    //dodawanie pracowników
    let zapisano = sprzedawca => {
      return $mdDialog.alert()
          .title('Sprzedawca ' + sprzedawca.imie + ' ' + sprzedawca.nazwisko + ' został zapisany!')
          .ok('Rozumiem, dzięki');
    };
    let dodawanie = ($scope, $mdDialog, sprzedawca) => {
      $scope.sprzedawca = sprzedawca;

      $scope.closeDialog = () => {
        $mdDialog.hide();
      };

      $scope.save = () => {
        if (Sprzedajacy.nowy(sprzedawca)) {
          $mdDialog.show(zapisano(sprzedawca));
        }
      };
    };
    this.dodaj = function dodaj() {
      var sprzedawca = {
        'imie': '',
        'nazwisko': '',
        'pesel': '',
        'haslo': ''
      };

      $mdDialog.show({
        template: formularz,
        locals: {sprzedawca},
        controller: dodawanie
      });
    };

    //edytowanie pracowników
    let edytowanie = ($scope, $mdDialog, sprzedawca) => {
      $scope.sprzedawca = Object.assign({}, sprzedawca);

      $scope.closeDialog = () => {
        $mdDialog.hide();
      };

      $scope.save = () => {
        $mdDialog.hide();

        if (Sprzedajacy.edytuj(sprzedawca)) {
          $mdDialog.show(zapisano(sprzedawca));
          sprzedawca = $scope.sprzedawca;
        }
      };
    };
    this.edytuj = function edytuj(sprzedawca) {
      $mdDialog.show({
        template: formularz,
        locals: {sprzedawca},
        controller: edytowanie
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
