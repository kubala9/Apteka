import angular from 'angular';
import tpl from '../views/ObslugaSprzedaz.html';
import formularz from '../views/_formularzSprzedaz.html';

class ObslugaSprzedazy {

    constructor($scope, $mdDialog, Sprzedaz, Kupujacy, Produkt, Notyfikacje) {
        var ctrl = this;

        this.sprzedaz = Sprzedaz.pobierz();
        this.kupujacy = Kupujacy.pobierz();
        this.produkty = Produkt.pobierz();

        //dodawanie/edytowanie pracowników
        let modyfikowanie = ($scope, sprzedaz, kupujacy, produkty) => {
            if (angular.isDefined(sprzedaz)) {
                $scope.sprzedaz = angular.clone(sprzedaz);
            } else {
                $scope.sprzedaz = Sprzedaz.getPusty();
            }

            $scope.dodajProdukt = () => {
                $scope.sprzedaz.produkty.push({});
            };


            $scope.produkty = produkty;
            $scope.kupujacy = kupujacy;

            $scope.closeDialog = () => {
                Notyfikacje.zamknij();
            };

            $scope.save = () => {
                sprzedaz = $scope.sprzedaz;

                if (sprzedaz.id) {
                    if (Sprzedaz.edytuj(sprzedaz)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została zapisany!');
                    } else {
                        Notyfikacje.powiadomienie('Sprzedaż nie została zapisany!');
                    }
                } else {
                    if (Sprzedaz.nowy(sprzedaz)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadomienie('Sprzedaż została dodany!');
                    } else {
                        Notyfikacje.powiadomienie('Sprzedaż nie została zapisany!');
                    }
                }
            };
        };
        this.modyfikacja = function modyfikacja(sprzedaz) {
            $mdDialog.show({
                template: formularz,
                locals: {sprzedaz, kupujacy: ctrl.kupujacy, produkty: ctrl.produkty},
                controller: modyfikowanie
            });
        };

        //usuwanie pracowników
        this.usun = function usun(sprzedaz) {
            Notyfikacje.potwierdzenie('Czy chcesz usunąć sprzedaż?', 'Tak', 'Nie')
                .then(function() {
                    if (Sprzedaz.usun(sprzedaz)) {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadom('Sprzedaż została usunięta!');
                    } else {
                        Notyfikacje.zamknij();
                        Notyfikacje.powiadom('Sprzedaż nie została usunięta!');
                    }
                }, function() {
                    Notyfikacje.zamknij();
                    Notyfikacje.powiadom('Sprzedaż nie została usunięta!');
                });
        };
    }
}

export const obslugasprzedazy = {
    template: tpl,
    controller: ObslugaSprzedazy
};
