import tpl from '../views/Home.html';

class Home {
  constructor() {
    this.text = 'siema';
  }
}

export const home = {
  template: tpl,
  controller: Home
};
