import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../servicios/carrito.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.page.html',
  styleUrls: ['./ordenes.page.scss'],
})
export class OrdenesPage implements OnInit {

  constructor( public cs: CarritoService,
               private router: Router) { }

  ngOnInit() {
    console.log('cargando ordenes');
    this.cs.cargarOrdenes();
  }

  public irDetalle(orden: any) {
    this.router.navigate( ['/ordenes-detalle', JSON.stringify(orden)]);
  }
}
