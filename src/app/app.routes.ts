
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importar componentes
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';


export const appRoutes: Routes = [
    { path: 'listar-usuarios', component: UsuariosComponent },
    { path: 'listar-usuarios/:mensaje', component: UsuariosComponent },
    { path: 'peliculas', component: PeliculasComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'editar-usuario/:idUsuario', component: CrearUsuarioComponent },
]

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);