export const formControl = (config, validation) => { // принимаем объект с конфигурациями и что валидируем
    return {
        ...config,
        validation,
        valid: !validation, // чтобы изначально форма была не валидирована
        touched: false, // чтобы изначально не было красных подчеркиваний
        value: ''
    }
}

export const validateControl = (value, validation = null) => {
    if(!validation) {
        return true;
    }
    let isValid = true;

    if(validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    return isValid;
}

export const validateForm = (formControls) => {
    let isFormValid = true
  
    for (let control in formControls) {
      if (formControls.hasOwnProperty(control)) {
        isFormValid = formControls[control].valid && isFormValid
      }
    }
  
    return isFormValid
  }