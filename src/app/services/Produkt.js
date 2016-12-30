import angular from 'angular';

class Produkt {
    constructor($localStorage) {
        "ngInject";

        this.listaproduktow = [{nazwa:"ALERIC", opis:"tabl.0,01 g (7 tabl.)", cena:33.59, dostepnosc:"Dostępny", recepta:"Tylko na receptę", refundacja:"0", stan: 10, id:3},{nazwa:"BUDERHIN", opis:"aerozol do nosa; 50 µg/dawkę; 200 dawek", cena:13.99, dostepnosc:"Dostępny", recepta:"Tylko na receptę", refundacja:"0", stan:10, id:4},{nazwa:"CLARINASE", opis:"tabl. o przedł. uwalnianiu (10 tabl.)", cena:"22.99", dostepnosc:"Chwilowy brak produktu", recepta:"Tylko na receptę", refundacja:"100", stan:10, id:5},{nazwa:"DORETA", opis:"tabletki powlekane; 37,5 mg tramadolu i 325 mg paracetamolu;", cena:45.99, dostepnosc:"Dostępny", recepta:"Tylko na receptę", refundacja:"0", stan:10, id:6},{nazwa:"EPIDUO", opis:"żel; 15 g", cena:19.99, dostepnosc:"Dostępny", recepta:"Tylko na receptę", refundacja:"0", stan:10, id:7},{nazwa:"IBUFEN", opis:"tabl. powl. 0,2 g (10 tabl., 30 tabl.)", cena:22.99, dostepnosc:"Chwilowy brak produktu", recepta:"Tylko na receptę", refundacja:"50", stan:10, id:8},{nazwa:"KOFEPAR", opis:"tabl. (10 tabl.)", cena:15.49, dostepnosc:"Chwilowy brak produktu", recepta:"Tylko na receptę", refundacja:"0", stan:10, id:9},{nazwa:"METAFEN", opis:"tabl. (10 tabl.)", cena:11.29, dostepnosc:"Dostępny", recepta:"Dostępny bez recepty", refundacja:"0", stan:10, id:10},{nazwa:"PANADOL", opis:"tabl. powl. 0,5 g (12 tabl., 24 tabl., 48 tabl.)", cena:9.99, dostepnosc:"Chwilowy brak produktu", recepta:"Dostępny bez recepty", refundacja:"0", stan:10, id:11},{nazwa:"RUBITAL", opis:"syrop 0,012 g/ml (0,06 g/5 ml)", cena:21.49, dostepnosc:"Dostępny", recepta:"Dostępny bez recepty", refundacja:"0", stan:10, id:12},{nazwa:"SOLPADEINE", opis:"kaps. 1 kaps. zawiera: 0,5 g paracetamolu, 0,008 g kodeiny, 0,03 g kofeiny (12 kaps.)", cena:19.30, dostepnosc:"Dostępny", recepta:"Dostępny bez recepty", refundacja:"100", stan:10, id:13},{nazwa:"TRAMAL", opis:"kapsułki; 50 mg; (20 kaps.)", cena:13.99, dostepnosc:"Dostępny", recepta:"Tylko na receptę", refundacja:"0", stan:10, id:14},{nazwa:"VIPROSAL B", opis:"maść na skórę; 100 gzawiera: 5 j. mysich jadu żmii zygzakowatej, 3 gkamfory, 1 gkwasu salicylowego, 3 golejku z sosny syberyjskiej;50 g", cena:36.69, dostepnosc:"Dostępny", recepta:"Dostępny bez recepty", refundacja:"0", stan:10, id:15},{nazwa:"ZALDIAR", opis:"tabletki musujące; 37,5 mg tramadolu i 325 mg paracetamolu; 20 sztuk, 30sztuk", cena:25.59, dostepnosc:"Chwilowy brak produktu", recepta:"Tylko na receptę", refundacja:"100", stan:10, id:16}
        ];

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
