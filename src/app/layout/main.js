import angular from 'angular';

class App {
  constructor($rootScope, Sprzedajacy, Kupujacy, $localStorage) {
    "ngInject";

    $rootScope.user = 'dami95';

    if (!angular.isArray($localStorage.sprzedajacy)) {
      this.Sprzedajacy = Sprzedajacy;
      this.firstInitSprzedajacy();
    }

    if (!angular.isArray($localStorage.kupujacy)) {
      this.Kupujacy = Kupujacy;
      this.firstInitKupujacy();
    }
  }


  firstInitSprzedajacy() {
    let sprzedawca = {
      'imie': 'Damian',
      'nazwisko': 'Lewita',
      'pesel': '95081604559',
      'haslo': 'pass'
    };
    let sprzedawca2 = {
      'imie': 'Jakub',
      'nazwisko': 'Michniewski',
      'pesel': '95081604550',
      'haslo': 'pass2'
    };

    this.Sprzedajacy.nowy(sprzedawca);
    this.Sprzedajacy.nowy(sprzedawca2);
  }

  firstInitKupujacy() {
    let kupujacy = {
      imie: 'Paweł',
      nazwisko: 'Karczewski',
      pesel: '12345678901',
      haslo: 'pass2',
      email: 'karczewskipawel@hotmail.com',
      telefon: '791999468',
      adres: 'Jagodowa 3, Warszawa'
    };

    let kupujacy2 = {
      imie: 'Jakub',
      nazwisko: 'Michniewski',
      pesel: '98765432101',
      haslo: 'pass',
      email: 'jakubek@onet.pl',
      telefon: '856476312',
      adres: 'Malinowa 8, Warszawa'
    };

    this.Kupujacy.nowy(kupujacy);
    this.Kupujacy.nowy(kupujacy2);
  }
}

export const main = {
  template: require('./main.html'),
  controller: App
};
