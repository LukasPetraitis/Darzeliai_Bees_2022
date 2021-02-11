function InputValidator(event) {
    const target = event.target;
        if (target.validity.valueMissing && target.id !== "txtBirthdate") {
            target.setCustomValidity(target.placeholder + " yra privalomas laukelis")
        }
        else {
            if (target.id === "txtEmail") {
                if (target.validity.patternMismatch) {
                    target.setCustomValidity("Neteisingas el. pašto formatas")
                }
                else {
                    target.setCustomValidity("")
                }
            }
            // else if(target.id==="txtBirthdate") {
            //     if(target.validity.valueMissing) {
            //         target.setCustomValidity("Gimimo data yra privalomas laukelis")
            //     }
            //     else if(target.validity.patternMismatch) {
            //         target.setCustomValidity("Neteisingas gimimo datos formatas")
            //     }
            //     else if(target.validity.rangeOverflow) {
            //         target.setCustomValidity("Gimimo data negali būti ateityje")
            //     }
            //     else if(target.validity.rangeUnderflow) {
            //         target.setCustomValidity("Gimimo data negali būti ankstesnė nei 01.01.1900")
            //     }
            //     else {
            //         target.setCustomValidity("")
            //     }
            // }
            else if (target.id === "txtIdentificationCode") {
                if (target.validity.patternMismatch) {
                    target.setCustomValidity("Asmens koda sudaro 11 skaičių, įvesta skaičių: " + target.value.length)
                }
                else {
                    target.setCustomValidity("")
                }
            }
            else if (target.id === "txtName") {
                if (target.validity.patternMismatch) {
                    target.setCustomValidity("Netinkamo formato vardas")
                }
                else {
                    target.setCustomValidity("")
                }
            }
            else if (target.id === "txtSurname") {
                if (target.validity.patternMismatch) {
                    target.setCustomValidity("Netinkamo formato pavardė")
                }
                else {
                    target.setCustomValidity("")
                }
            }
            else if (target.id === "txtAddress") {
                target.setCustomValidity("");
            }
            else if (target.id === "txtTelNo") {
                if (target.validity.patternMismatch) {
                    target.setCustomValidity("Telefono numerį sudaro 8 skaičiai, įvesta skaičių: " + target.value.length)
                }
                else {
                    target.setCustomValidity("");
                }
            }
        }
}

export default InputValidator;