import angular from 'angular';

class Kupujacy {
    constructor($localStorage) {
        "ngInject";

        this.listakupujacych = [
            {
                id: '1',
                imie: 'Paweł',
                nazwisko: 'Karczewski',
                pesel: '1234566789',
                haslo: '',
                email: 'karczewskipawel@hotmai.com',
                telefon: '791999468',
                adres: 'Jagodowa 3'
            },
            {
                id: '2',
                imie: 'Jakub',
                nazwisko: 'Michniewski',
                pesel: '987654321',
                haslo: '',
                email: 'jakubek@onet.pl',
                telefon: '856476312',
                adres: 'Malinowa 8'
            }
        ];

        this.wczytaj = function wczytaj() {
            if (angular.isDefined($localStorage.kupujacy)) {
                this.listakupujacych = $localStorage.kupujacy;
            }
        };

        this.nowy = function nowy(kupujacy) {
            kupujacy.id = this.listakupujacych[this.listakupujacych.length -1].id + 1;

            this.listakupujacych.push(kupujacy);
            $localStorage.kupujacy = this.listakupujacych;
        };

        this.zapisz = function zapisz(kupujacy) {
            var i = this.listakupujacych.findIndex((element, index, array) => element.id === kupujacy.id);
            if (i === -1) {
                return false;         
            }
            this.listakupujacych[i] = kupujacy;
            $localStorage.kupujacy = this.listakupujacych;
            return true;
        };

        this.usun = function usun(kupujacy) {
            var i = this.listakupujacych.findIndex((element, index, array) => element.id === kupujacy.id);
            if (i === -1) {
                return false;         
            }
            this.listakupujacych.splice(i, 1);
            $localStorage.kupujacy = this.listakupujacych;
            console.log("baza", $localStorage);
            return true;
        };
        this.wczytaj();

    }

    pobierz() {
        return this.listakupujacych;
    }

}

export default Kupujacy;
