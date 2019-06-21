import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(public modalCrtl: ModalController,
              public cs: CarritoService) { }

  ngOnInit() {
  }
  salir() {
    this.modalCrtl.dismiss(false);
  }

}
