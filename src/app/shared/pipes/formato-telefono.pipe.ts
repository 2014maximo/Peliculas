import { Pipe, PipeTransform } from '@angular/core';
/*
 * Formatos de telefono
 * Fijo: ### ## ##
 * Celular: ### ### ## ##
 * 01 8000: ## #### ### ###
 * 019...: ### ### ### ###
*/
@Pipe({ name: 'formatoTelefono' })
export class FormatoTelefonoPipe implements PipeTransform {
    
  transform(tel: string): string {
    return formatoTelefono(tel);
  }
}

export function formatoTelefono(tel: string): string {
  if (!tel) { return ''; }

  const value = tel.toString().trim().replace(/ /g, '');

  switch (value.length) {
    case 7: // ### ## ##
      if (value.slice(0, 2) !== '01') {

        tel = value.slice(0, 3) +
          ' ' + value.slice(3, 5) +
          ' ' + value.slice(5);
      }
      break;
    case 10: // ### ### ## ##
      if (value.slice(0, 2) !== '01' && !value.slice(9, 10).match(/[^0-9]/)) {
        tel = value.slice(0, 3) +
          ' ' + value.slice(3, 6) +
          ' ' + value.slice(6, 8) +
          ' ' + value.slice(8);
      }
      break;

    default:
      if (value.slice(0, 3) === '018') {
        // ## #### ### ###
        tel = value.slice(0, 2) +
          ' ' + value.slice(2, 6) +
          ' ' + value.slice(6, 9) +
          ' ' + value.slice(9);
      } else if (value.slice(0, 3) === '019') {
        // ### ### ### ###
        tel = value.slice(0, 3) +
          ' ' + value.slice(3, 6) +
          ' ' + value.slice(6, 9) +
          ' ' + value.slice(9);
      }
  }

  return tel.trim();
}
