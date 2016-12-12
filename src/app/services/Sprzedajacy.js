class Sprzedajacy {
    constructor() {
        "ngInject";

        this.lista = [];

        let sprzedawca = {
            'id': 0,
            'imie': 'Damian',
            'nazwisko': 'Lewita',
            'pesel': '95081604551',
            'haslo': 'mojehasło'
        };
        this.lista.push(sprzedawca);
    }

    nowy(sprzedawca) {
        if (this.lista.length === 0) {
            sprzedawca.id = 0;
        } else {
            sprzedawca.id = this.lista[this.lista.length - 1].id + 1;
        }

        this.lista.push(sprzedawca);
        return true;
    }

    //wyciągnij sprzedających
    pobierz() {
        return this.lista;
    }

    edytuj(sprzedawca) {
        var index = this.lista.indexOf(sprzedawca);
        if (index === -1) {
            return false;
        }

        this.lista[index] = sprzedawca;
        return true;
    }

    usun(sprzedawca) {
        var index = this.lista.indexOf(sprzedawca);
        if (index === -1) {
            return false;
        }

        this.lista.splice(index, 1);
        return true;
    }
}

export default Sprzedajacy;
