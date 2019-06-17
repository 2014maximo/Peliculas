import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message } from 'primeng/components/common/message';
import { UsuarioModel } from '../../models/usuario';
import { validarTelefono } from '../../shared/utils/validaciones-generales';
import { Validaciones } from './validaciones';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {


  form: FormGroup;
  msgs: Message[] = [];
  verActualizar = false;
  estado: boolean;
  usuario: UsuarioModel;
  idUsuario: string;

  // https://regex101.com/
  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private routerNav: Router) {

    this.form = this.fb.group({
      id: [null],
      nombre: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-z\s\xF1\xD1]+$/)//solo letras
        ]],
      telefono: [null,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(10),
          Validators.pattern(/^([0-9])*$/),//solo numeros
          validarTelefono()
        ]],
      direccion: [null],
      edad: [null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(3),
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^([0-9])*$/),//solo numeros
        ]],
      correo: ['@gmail.com',
        [
          Validators.pattern(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/),//correo debe tner @ y .com
        ]],
      company: [null],
      estado: [null]
    },
      {
        validators: [
          Validaciones.direccionRequeridaPorTelefono,
          Validaciones.validarNombreCorreo
        ]
      }
    );
  }

  ngOnInit() {

    this.idUsuario = this.router.snapshot.paramMap.get('idUsuario');

    this.usuarioService.consultarUsuario(this.idUsuario).subscribe(data => {
      this.usuario = data;
      this.form.get('nombre').setValue(this.usuario.nombre);
      this.form.get('telefono').setValue(this.usuario.telefono);
      this.form.get('direccion').setValue(this.usuario.direccion);
      this.form.get('correo').setValue(this.usuario.correo);
      this.form.get('estado').setValue(this.usuario.estado);
      this.form.get('company').setValue(this.usuario.company);
      this.form.get('edad').setValue(this.usuario.edad);
    });
  }

  agregarAlCorreo(dato: any) {
    this.form.get('correo').setValue(dato + '@gmail.com');
  }

  guardar() {

    let mensaje = '';

    if (this.form.invalid) {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Error', detail: 'Debes completar la informacion del formulario.' });
    } else {

      if (!this.usuario) {
        this.usuario = new UsuarioModel();
      }

      this.usuario.correo = this.form.get('correo').value;
      this.usuario.nombre = this.form.get('nombre').value;
      this.usuario.telefono = this.form.get('telefono').value;
      this.usuario.edad = this.form.get('edad').value;
      this.usuario.company = this.form.get('company').value;
      this.usuario.direccion = this.form.get('telefono').value;

      if (this.idUsuario) {

        this.usuarioService.actualizarUsuario(this.usuario).subscribe(data => {

          this.form.reset();
          mensaje = 'Registro actualizado con exito.';
          this.routerNav.navigate(['/listar-usuarios', mensaje]);
        });

      } else {

        this.usuarioService.guardarUsuario(this.usuario).subscribe(data => {

          this.form.reset();
          mensaje = 'Registro almacenado con exito.';
          this.routerNav.navigate(['/listar-usuarios', mensaje]);
        });
      }



    }

  }

}
