class SaveLoginInfoToLS {
  constructor(inputFields, namesOfFields, user) {
    this._fields = inputFields;
    this._userName = user;
    this._namesOfFields = namesOfFields;
    inputFields._toAddListenerToField = this.toAddInfoFromFieldToLS();
  }

  toAddInfoFromFieldToLS() {
    let fieldNames = this._namesOfFields;
    let objToLS = this._userName;
    this._fields.addEventListener("change", function ({ target }) {
      fieldNames[target.name] = target.value;
      localStorage.setItem(objToLS, JSON.stringify(fieldNames));
    });
  }
}

const fieldNames = {
  fieldsToTakeInfo: {
    userName: null,
    userPhoneNumber: null,
    userPassword_1: null,
    userPassword_2: null,
  },
  helper: "helper",
};
const { fieldsToTakeInfo, helper } = fieldNames;

new SaveLoginInfoToLS(auth, fieldsToTakeInfo, helper);

class GetInfoFRomLS {
  constructor(form, lsHelper) {
    this._form = form;
    this._lsHelper = lsHelper;
    this.objFromLS = null;
    form._getInfo = this.getInfoFromLS();
  }
  getInfoFromLS() {
    this.objFromLS = JSON.parse(localStorage.getItem(this._lsHelper));
    this.setInfoToInput();
  }
  setInfoToInput() {
    if (this._lsHelper.length > 0) {
      console.log(this.objFromLS, "objFromLs");
      for (let key in this.objFromLS) {
        if (!this._form.querySelector(`input[name="${key}"]`)) return;
        this._form.querySelector(`input[name="${key}"]`).value =
          this.objFromLS[key];
      }
    }
  }
}

new GetInfoFRomLS(auth, helper);

submitButton.addEventListener("click", (e) => e.preventDefault());
