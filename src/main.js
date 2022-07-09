class SaveLoginInfoToLS {
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

new SaveLoginInfoToLS(auth, fieldNames);

class GetInfoFRomLS {
  constructor(form, fieldsToUpdate) {
    this._form = form;
    this._fieldsToUpdate = fieldsToUpdate;
    this.lsHelper = [];
    form._getInfo = this.getInfoFromLS();
  }
  getInfoFromLS() {
    this._fieldsToUpdate.forEach((item) => {
      this.lsHelper.push([item, localStorage.getItem(item)]);
    });
    this.setInfoToInput();
  }
  setInfoToInput() {
    if (this.lsHelper.length > 0) {
      this.lsHelper.forEach((item) => {
        this._form.querySelector(`input.${item[0]}`).value = item[1];
      });
    }
  }
}

new GetInfoFRomLS(auth, fieldNames);
