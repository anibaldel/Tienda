import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
// usuario service
import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  items: any[] = [];
  totalCarrito = 0;
  ordenes: any[] = [];

  constructor(public http: HttpClient,
              public alertCtrl: AlertController,
              private platform: Platform,
              private storage: Storage,
              private us: UsuarioService,
               ) {
      this.cargar_storage();
      this.actualizarTotal();
  }

  removeItem( idx: number ) {

    this.items.splice(idx, 1);
    this.guardarStorage();

  }

  realizarPedido() {

    const data = new FormData();
    const codigos: string[] = [];

    for ( const item of this.items ) {
      codigos.push( item.codigo );
    }

    data.append('items', codigos.join(','));
    console.log(codigos.join(','));

    const url = `${ URL_SERVICIOS }/pedidos/realizar_orden/${ this.us.token }/${ this.us.idUsuario }`;

    return this.http.post( url, data )
      .pipe(
      map(resp => resp))
      .subscribe( (resp: any) => {
        console.log(resp);
        if ( resp.error ) {
          this.errorOrden( resp);
        } else {
          this.items = [];
          this.ordenRealizada();
        }
      });
  }
  async errorOrden( data: any) {
    const alert = await this.alertCtrl.create({
      header: '"Error en la orden"',
      subHeader: data.mensaje,
      buttons: ['OK']
    });
    return await alert.present();
  }
  async ordenRealizada( ) {
    const alert = await this.alertCtrl.create({
      header: 'Orden Realizada',
      subHeader: 'Nos contactaremos con usted próximamente',
      buttons: ['OK']
    });
    return await alert.present();
  }
  async agregarCarrito( itemParametro: any ) {
    for ( const item of this.items ) {
      if ( item.codigo === itemParametro.codigo ) {
        const alert = await this.alertCtrl.create({
          header: 'Item existe',
          subHeader: itemParametro.producto + ', ya se encuentra en su carrito de compras',
          buttons: ['OK']
        });
        return await alert.present();
      }
    }
    this.items.push ( itemParametro);
    this.actualizarTotal();
    this.guardarStorage();
  }
  actualizarTotal() {

    this.totalCarrito = 0;
    for ( const item of this.items ) {
      this.totalCarrito += Number( item.precio_compra );
    }

  }

  private guardarStorage() {

    if ( this.platform.is('cordova') ) {
      // dispositivo
      this.storage.set('items', this.items );

    } else {
      // computadora
      localStorage.setItem('items', JSON.stringify( this.items ) );

    }
  }

  cargar_storage() {
    const promesa = new Promise( ( resolve, reject ) => {

      if ( this.platform.is('cordova') ) {
        // dispositivo
        this.storage.ready()
              .then( () => {
              this.storage.get('items')
                      .then( items => {
                        if ( items ) {
                          this.items = items;
                        }
                        resolve();
                    });
          });


      } else {
        // computadora
        if ( localStorage.getItem('items') ) {
          // Existe items en el localstorage
          this.items = JSON.parse( localStorage.getItem('items') );
        }
        resolve();
      }

    });

    return promesa;

  }

  cargarOrdenes() {

    const url = `${ URL_SERVICIOS }/pedidos/obtener_pedidos/${ this.us.token }/${ this.us.idUsuario }`;

    this.http.get( url )
      .pipe(
        map(resp => resp))
        .subscribe( (resp: any) => {
        if ( resp.error ) {
          // MANEJAR EL ERROR
        } else {
          this.ordenes = resp.ordenes;
        }
      });


  }

  borrarOrden( id: string ) {

    const url = `${ URL_SERVICIOS }/pedidos/borrar_pedido/${ this.us.token }/${ this.us.idUsuario }/${ id }`;

    return this.http.delete( url )
          .pipe(
           map(resp => resp));


  }
}

