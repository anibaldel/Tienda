import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor( public ps: ProductoService,
               private router: Router) { }

  ngOnInit() {
  }

  buscarProductos(ev: any) {

    const valor = ev.target.value;
    // console.log(valor);

    this.ps.buscarProducto( valor );
  }

  abrirProducto(item: any) {
    this.router.navigate( ['/producto', JSON.stringify(item)]);
  }

}
