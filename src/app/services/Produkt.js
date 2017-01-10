import angular from 'angular';

class Produkt {
    constructor($localStorage) {
        "ngInject";

        this.listaproduktow = [];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.produkt)) {
                this.listaproduktow = $localStorage.produkt;
            }
        };

        this.zapisz = function zapisz() {
            if (angular.isArray(this.listaproduktow)) {
                $localStorage.produkt = this.listaproduktow;
            }
        };

        this.wczytaj();
    }

    nowy(produkt) {
        if (this.listaproduktow.length === 0) {
            produkt.id = 1;
        } else {
            produkt.id = this.listaproduktow[this.listaproduktow.length - 1].id + 1;
        }

        this.listaproduktow.push(produkt);
        this.zapisz();

        return true;
    }

    pobierz() {
        this.wczytaj();

        return this.listaproduktow;
    }

    edytuj(produkt) {
        var i = this.listaproduktow.findIndex((element, index, array) => element.id === produkt.id);

        if (i === -1) {
            return false;
        }

        this.listaproduktow[i] = produkt;
        this.zapisz();

        return true;
    }

    usun(produkt) {
        var i = this.listaproduktow.indexOf(produkt);
        if (i === -1) {
            return false;
        }

        this.listaproduktow.splice(i, 1);
        this.zapisz();

        return true;
    }
}

export default Produkt;
