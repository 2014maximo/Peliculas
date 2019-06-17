import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'http://localhost:3000/usuario/';

  constructor(private _httpClient: HttpClient) { }

  consultarUsuarios(): Observable<UsuarioModel[]> {
    return this._httpClient.get<UsuarioModel[]>(this.url);
  }

  consultarUsuario(idConsultar: string): Observable<any> {
    return this._httpClient.get<UsuarioModel>(this.url + idConsultar);
  }

  guardarUsuario(datosUsuario: UsuarioModel): Observable<UsuarioModel> {
    return this._httpClient.post<UsuarioModel>(this.url, datosUsuario);
  }

  actualizarUsuario(datosUsuario: UsuarioModel): Observable<UsuarioModel> {
    return this._httpClient.put<UsuarioModel>(this.url + datosUsuario.id, datosUsuario);
  }

  eliminarUsuario(idEliminar: string): Observable<UsuarioModel> {
    return this._httpClient.delete<UsuarioModel>(this.url + idEliminar);
  }

}
