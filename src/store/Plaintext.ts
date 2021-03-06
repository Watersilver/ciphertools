import { makeAutoObservable } from "mobx"

type Defaults = "D'Agapeyeff"

class Plaintext {
  private text: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  set({
    type,
    content
  }: {
    type?: "custom",
    content: string
  } | {
    type: "default",
    content: Defaults
  }) {
    if (type === "default") {
      switch (content) {
        case "D'Agapeyeff":
          this.text = "75628 28591 62916 48164 91748 58464 74748 28483 81638 18174\n" +
          "74826 26475 83828 49175 74658 37575 75936 36565 81638 17585\n" +
          "75756 46282 92857 46382 75748 38165 81848 56485 64858 56382\n" +
          "72628 36281 81728 16463 75828 16483 63828 58163 63630 47481\n" +
          "91918 46385 84656 48565 62946 26285 91859 17491 72756 46575\n" +
          "71658 36264 74818 28462 82649 18193 65626 48484 91838 57491\n" +
          "81657 27483 83858 28364 62726 26562 83759 27263 82827 27283\n" +
          "82858 47582 81837 28462 82837 58164 75748 58162 92000"
        break;
      }
    } else {
      this.text = content;
    }
  }

  get() {
    return this.text;
  }
}

export default Plaintext