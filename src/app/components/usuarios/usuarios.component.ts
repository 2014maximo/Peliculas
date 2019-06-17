import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmationService, Message } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[];
  foto: any[];
  msgs: Message[] = [];

  constructor(private usuarioService: UsuarioService,
    private confirmationService: ConfirmationService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.consultarUsuarios();

    const mensaje = this.router.snapshot.paramMap.get('mensaje');
    this.msgs = [];
    if (mensaje) {
      this.msgs.push({
        severity: 'success',
        summary: 'Informacion',
        detail: mensaje
      });
    }

  }

  confirmarEliminar(idEliminar: string) {
    this.confirmationService.confirm({
      message: 'Esta seguro de eliminar?',
      accept: () => {

        this.usuarioService.eliminarUsuario(idEliminar).subscribe(data => {
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: 'Informacion',
            detail: 'Registro eliminado con exito.'
          });

          this.consultarUsuarios();

        });

      }
    });
  }


  consultarUsuarios() {
    this.usuarioService.consultarUsuarios().subscribe(datos => {
      this.usuarios = datos;
    });
  }
}
