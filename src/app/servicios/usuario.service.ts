import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertController, Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string;
  idUsuario: string;

  constructor(public http: HttpClient,
              private alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage) {
  this.cargarStorage();

  }

  activo(): boolean {

  if ( this.token ) {
    return true;
  } else {
    return false;
    }
  }

  ingresar(correo: string, contrasena: string ) {
    const data = new FormData();
    data.append('correo', correo);
    data.append('contrasena', contrasena);
    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, data )
      .pipe(
      map(resp => resp))
      .subscribe( (data_resp: any) => {
        console.log(data_resp);
        if ( data_resp.error ) {
          this.errorIngreso( data_resp);
        } else {
          this.token = data_resp.token;
          this.idUsuario = data_resp.id_usuario;
          // console.log(this.token);
          // guardar storage
          this.guardarStorage();
        }
      });
  }

  async errorIngreso( data: any) {
    const alert = await this.alertCtrl.create({
      header: '"Error al iniciar"',
      subHeader: data.mensaje,
      buttons: ['OK']
    });
    return await alert.present();
  }

  cerrarSesion() {

    this.token = null;
    this.idUsuario = null;

    // guardar storage
    this.guardarStorage();
  }
  private guardarStorage() {

    if ( this.platform.is('cordova') ) {
      // dispositivo
      this.storage.set('token', this.token );
      this.storage.set('idUsuario', this.idUsuario );

    } else {
      // computadora
      if (this.token) {
        localStorage.setItem('token', this.token );
        localStorage.setItem('idUsuario', this.idUsuario );
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('idUsuario');
      }

    }
  }

  cargarStorage() {
    const promesa = new Promise( ( resolve, reject ) => {

      if ( this.platform.is('cordova') ) {
        // dispositivo
        this.storage.ready()
              .then( () => {
              this.storage.get('token')
                      .then( token => {
                        if ( token ) {
                          this.token = token;
                        }
                        resolve();
                    });
              this.storage.get('idUsuario')
                    .then( idUsuario => {
                      if ( idUsuario ) {
                        this.idUsuario = idUsuario;
                      }
                      resolve();
                  });
          });


      } else {
        // computadora
        if ( localStorage.getItem('token') ) {
          // Existe items en el localstorage
          this.token = localStorage.getItem('token');
          this.idUsuario = localStorage.getItem('idUsuario');
        }
        resolve();
      }

    });

    return promesa;

  }



}
