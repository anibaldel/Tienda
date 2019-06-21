import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { UsuarioService } from '../../servicios/usuario.service';
import { CarritoPage } from '../carrito/carrito.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo = '';
  contrasena = '';


  constructor(private modalCtrl: ModalController,
              private us: UsuarioService) { }

  ngOnInit() {
  }

  async ingresar() {
    let modal: any;

    this.us.ingresar( this.correo, this.contrasena );
    this.modalCtrl.dismiss(false);

    if ( this.us.activo()) {
      modal = await this.modalCtrl.create({
        component: CarritoPage,
      });
      return await modal.present();
    }

  }

  salir() {
    this.modalCtrl.dismiss(false);
  }

}
