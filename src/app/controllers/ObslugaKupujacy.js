import tpl from '../views/ObslugaKupujacy.html';
import formularz from '../views/_formularzKupujacy.html';

class ObslugaKupujacy {
  
  constructor($scope, $mdDialog, Kupujacy) {
    this.kupujacy = Kupujacy.pobierz();

    let modyfikowanie = ($scope, $mdDialog, kupujacy) => {
      if (typeof kupujacy !== "undefined") {
        $scope.kupujacy = Object.assign({}, kupujacy);
        $scope.kupujacy.haslo = '';
        $scope.isNew = false;
      } else {
        $scope.kupujacy = {
          id: '',
          imie: '',
          nazwisko: '',
          pesel: '',
          haslo: '',
          email: '',
          telefon: '',
          adres: ''
        };
        $scope.isNew = true;
      }
      
      $scope.changed = false;
      
      let zapisano = kupujacy => {
      return $mdDialog.alert()
          .title('Klient ' + kupujacy.imie + ' ' + kupujacy.nazwisko+ ' został zapisany!')
          .ok('Ok!');
      };

      $scope.changeValue = function() {
        $scope.changed = true;
      };

      $scope.closeDialog = () => {
        $mdDialog.hide();
      };

      $scope.save = () => {
        if ($scope.kupujacy.id !== '') {
          Kupujacy.zapisz($scope.kupujacy);
          $mdDialog.show(zapisano($scope.kupujacy));
        } else {
          Kupujacy.nowy($scope.kupujacy);
          $mdDialog.show(zapisano($scope.kupujacy));
        }
        
        $scope.closeDialog();
      };
    };

    this.modyfikacja = function modyfikacja(kupujacy) {
      $mdDialog.show({
        template: formularz,
        locals: {kupujacy}, //strzykujemy aktualnie dodawanego/edytowanego sprzedawce
        controller: modyfikowanie
      });
    };

    let potwierdzUsuniecie = kupujacy => {
      return $mdDialog.confirm()
          .title('Czy napewno chcesz usunąć klienta ?')
          .ok('Tak')
          .cancel('Nie');
      };
    this.usun = function usun(kupujacy) {
      $mdDialog
          .show(potwierdzUsuniecie(kupujacy))
          .then(function() {
            Kupujacy.usun(kupujacy);
          }, function() {
            $mdDialog.hide();
          });
      this.kupujacy = Kupujacy.pobierz();
    };
    
  }
}


export const obslugakupujacy = {
  template: tpl,
  controller: ObslugaKupujacy
};
