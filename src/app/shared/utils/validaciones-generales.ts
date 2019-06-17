import { AbstractControl } from '@angular/forms';

export function validarTelefono() {
    return (telefono: AbstractControl): { [key: string]: any } => {
        if (telefono.value) {
            const numTelefono: string = telefono.value;
            if (numTelefono.length === 7 || numTelefono.length === 10) {
                return null;
            } else {
                return { 'telefonoInvalido': { value: telefono.value } }
            }
        } else {
            return null;
        }
    };
}

/**
 * Valida los campos numericos
 */
export function validarCampoNumericoMayorCero() {
    const objRegExp = /^[1-9]+[0-9]*$/;
    return (control: AbstractControl): { [key: string]: any } => {
        const numeroDocValido = control.value ? objRegExp.test(control.value) : true;
        return !numeroDocValido ? { 'campoNumericoMayorCeroInvalido': { value: control.value } } : null;
    };
}
