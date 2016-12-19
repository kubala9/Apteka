class Notyfikacje {
    constructor($mdDialog, $mdToast) {
        this.dialog = $mdDialog;
        this.toast = $mdToast;
    }

    zamknij() {
        this.dialog.hide();
        this.toast.hide();
    }

    powiadomienie(tekst) {
        var toast = this.toast.simple()
            .textContent(tekst)
            .position('top right')
            .hideDelay(3000);

        return this.toast.show(toast);
    }

    potwierdzenie(tekst, ok, anuluj) {
        var dialog = this.dialog.confirm()
            .title(tekst)
            .ok(ok)
            .cancel(anuluj);

        return this.dialog.show(dialog);
    }

}

export default Notyfikacje;