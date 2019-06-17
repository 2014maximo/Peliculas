import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GalleriaModule } from 'primeng/galleria';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SoloNumerosDirective } from './shared/directives/solo-numeros.directive';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { routing, appRoutingProviders } from './app.routes';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HttpConfigInterceptor } from './interceptor/httpConfigInterceptor.interceptor';
import { FormatoTelefonoPipe } from './shared/pipes/formato-telefono.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    SoloNumerosDirective,
    FormatoTelefonoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    DialogModule,
    routing,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [
    appRoutingProviders,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
