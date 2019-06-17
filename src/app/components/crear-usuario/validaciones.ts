import { AbstractControl, Validators } from '@angular/forms';


export class Validaciones {

    static direccionRequeridaPorTelefono(control: AbstractControl) {

        if (control && control.get('telefono') && control.get('telefono').value) {
            const numeroTelefono: string = control.get('telefono').value;
            if (numeroTelefono.length === 7) {

                if(!control.get('direccion').value){
                    control.get('direccion').setErrors({'required' : true});
                }
            } 
        }
    }

    static validarNombreCorreo(control: AbstractControl) {

        if (control && control.get('nombre') &&
            control.get('nombre').value &&
            control.get('correo').value) {

            const nombre: string = control.get('nombre').value;
            const correo: string = control.get('correo').value;

            // Convierte el correo a minuscula y busca si contiene el nombre en minuscula
            if (correo.toLowerCase().search(nombre.toLowerCase()) === -1) {
                control.get('correo').setErrors({'correoSinNombre' : true});
            }
        }
    }

}