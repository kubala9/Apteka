import angular from 'angular';

class Zamowienie {
    constructor($localStorage, Produkt) { 
        "ngInject";
        
        this.koszyk = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.zamowienie)) {
                this.koszyk = $localStorage.zamowienie;
            }
        };
        
        this.zapisz = function zapisz() {
            if (angular.isArray(this.koszyk)) {
                $localStorage.zamowienie = this.koszyk;
            }
        };
        this.wczytaj();
    }



    nowy(zamowienie) {
        if (this.koszyk.length === 0) {
            this.koszyk.id = 1;
        } else {
            this.koszyk.id = this.koszyk[this.koszyk.length - 1].id + 1;
        }

        this.koszyk.push(zamowienie);
        this.zapisz();

        return true;
    }

    pobierz() {
        return this.koszyk;
    }

  /*  edytuj(zamowienie) {
        var i = this.listaproduktow.findIndex((element, index, array) => element.id === zamowienie.id);

        if (i === -1) {
            return false;
        }

        this.listaproduktow[i] = zamowienie;
        this.zapisz();

        return true;
     } */

    usun(zamowienie) {
        var i = this.koszyk.indexOf(zamowienie);
        if (i === -1) {
            return false;
        }

        this.koszyk.splice(i, 1);
        this.zapisz();

        return true;
    }
}

export default Zamowienie;
