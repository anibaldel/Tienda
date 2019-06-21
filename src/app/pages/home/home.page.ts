import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { CarritoService, UsuarioService } from '../../servicios/index.services';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any[] = Array(10);

  constructor( public ps: ProductoService,
               private router: Router,
               public cs: CarritoService,
               private modalCtrl: ModalController,
               public us: UsuarioService) {

  }

  siguinte_pagina( event ) {

    this.ps.cargar_todos()
    .then( () => {
      setTimeout(() => {
        console.log('Done');
        event.target.complete();
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.data.length === 1000) {
          event.target.disabled = true;
        }
      }, 500);
    });
  }
  enviarProducto(item: any) {
    this.router.navigate( ['/producto', JSON.stringify(item)]);
  }

  async verCarrito() {

    let modal: any;

    if ( this.us.token ) {
      // mostrar pagina del carrito
      modal = await this.modalCtrl.create({
        component: CarritoPage,
      });

    } else {
      // mostrar el login
      modal = await this.modalCtrl.create({
        component: LoginPage,
      });

    }
    modal.onDidDismiss(  ( abrirCarrito: boolean) => {

      console.log('hola', abrirCarrito);

      if ( abrirCarrito ) {
        this.modalCtrl.create({
          component: CarritoPage,
        });
      }

    });
    return await modal.present();
  }
}
