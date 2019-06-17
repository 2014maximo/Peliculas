import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[SoloNumeros]'
})
export class SoloNumerosDirective {

  regexStr = '^[0-9]*$';
  constructor(private el: ElementRef) { }

  // Determina si
  @Input() SoloNumeros: string;

  @HostListener('keypress', ['$event']) onKeyDown(event) {
    const e = <KeyboardEvent>event;
    const c = e.keyCode || e.which;
    /* El caracter 46 es el punto se quito por que este componente es
    usado en el componente de telefonos */
    if ([8, 9, 27, 13, 190].indexOf(c) !== -1 ||
      // Allow: Ctrl+A
      (c === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (c === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (c === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (c === 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (c > 37 && c < 39)) {
      // let it happen, don't do anything
      return;
    }

    const ch = String.fromCharCode(c);
    const regEx = new RegExp(this.regexStr);
    if (regEx.test(ch)) {
      return;
    } else {
      e.preventDefault();
    }
  }

}
