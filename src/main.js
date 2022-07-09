class SavePass {
  constructor(inputFields, namesOfFields) {
    this._fields = inputFields;
    this._namesOfFields = namesOfFields;
    inputFields._toAddListenerToField = this.toAddInfoFromFieldToLS();
  }

  toAddInfoFromFieldToLS() {
    let fieldNames = this._namesOfFields;

    this._fields.addEventListener("change", function ({ target }) {
      fieldNames.forEach((i) => {
        if (target.classList.contains(`${i}`)) {
          localStorage.setItem(i, target.value);
        }
      });
    });
  }
}

const fieldNames = [
  "userName",
  "userPhoneNumber",
  "userPassword_1",
  "userPassword_2",
];

new SavePass(auth, fieldNames);
