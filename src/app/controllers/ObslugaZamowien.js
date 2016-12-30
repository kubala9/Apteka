import tpl from '../views/ObslugaZamowien.html';
import formularz from '../views/_formularzZamowienie.html';
import formularz2 from '../views/_formularzKoszyk.html';

class ObslugaZamowien {
 
  constructor($scope, $mdDialog, $mdToast, Notyfikacje, Produkt, Kupujacy, Zamowienie) {
    this.produkty = Produkt.pobierz();
    
   //dodawanie/edytowanie pracowników
   let modyfikowanie = ($scope, $mdDialog, produkt) => {
      $scope.pozycja = {
        produkt: '',
        ilosc: ''
      };
      $scope.zamowienie = Zamowienie.pobierz();
      console.log("nasze zamowienie", $scope.zamowienie);
      console.log("nasz produkt", produkt);
      $scope.pozycja.produkt = produkt;
      $scope.l=$scope.zamowienie.length;
      /*
      if (typeof zamowienie !== "undefined") {
        $scope.zamowienie = Object.assign({}, zamowienie);
      } else {
        $scope.zamowienie = 
          produkt: this.produkty[1],
            ilosc: 1
        };
      }*/
       
      $scope.closeDialog = () => {
        $mdDialog.hide();
      };
      
      $scope.save = () => { 
          Zamowienie.dodaj($scope.pozycja);
          $scope.closeDialog();
          
           /* Notyfikacje.powiadomienie('Dodano ' + pozycja.produkt.nazwa + ' do koszyka!');
          */
      };
       $scope.suma = () => {
           var suma=0;
           for (var x=0; x<$scope.l; x++) {
            suma+=($scope.pozycja[x].ilosc*$scope.pozycja[x].cena);
           }
           return suma;
       };
       
       $scope.usun = () => {
           
           Zamowienie.usun($scope.zamowienie);
           /*
      Notyfikacje.potwierdzenie('Czy chcesz usunąć ten produkt z koszyka?', 'Tak', 'Nie')
          .then(function() {
            if () {
              Notyfikacje.zamknij();
              Notyfikacje.powiadom('Produkt ' + pozycja.produkty.nazwa + ' został usunięty!');
            } else {
              Notyfikacje.zamknij();
              Notyfikacje.powiadom('Produkt ' + pozycja.produkty.nazwa + ' nie został usunięty!');
            }
          }, function() {
            Notyfikacje.zamknij();
            Notyfikacje.powiadom('Produkt ' + pozycja.produkty.nazwa + ' nie został usunięty!');
          });*/
    };
    };
    this.dodajDoKoszyka = function dodajDoKoszyka(produkt) {
      $mdDialog.show({
        template: formularz,
        locals: {produkt},
        controller: modyfikowanie
      });
    };

      this.pokazKoszyk = function pokazKoszyk(produkt) {
      $mdDialog.show({
        template: formularz2,
        locals: {produkt},
        controller: modyfikowanie
      });
    };
     
    
  }
}
export const obslugazamowien = {
  template: tpl,
  controller: ObslugaZamowien
};
