import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-ordenes-detalle',
  templateUrl: './ordenes-detalle.page.html',
  styleUrls: ['./ordenes-detalle.page.scss'],
})
export class OrdenesDetallePage implements OnInit {

  orden: any = {};

  constructor( public activatedRoute: ActivatedRoute,
               public cs: CarritoService,
               public router: Router) {
    this.orden = JSON.parse(this.activatedRoute.snapshot.paramMap.get('orden'));
    console.log(this.orden);
   }

  ngOnInit() {
  }

  borrarOrden( id: string ) {
    this.cs.borrarOrden(id)
      .subscribe((data: any) => {
        if (data.error ) {
          // manejo de errores
          console.log(data.error);
        } else {
          this.router.navigate( ['/ordenes']);
        }
      });
  }

}
