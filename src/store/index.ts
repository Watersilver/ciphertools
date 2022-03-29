import {makeAutoObservable} from "mobx"

import Plaintext from "./Plaintext"

class Store {
  readonly plaintext = new Plaintext();

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new Store();

export default store