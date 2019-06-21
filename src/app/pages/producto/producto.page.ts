import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../servicios/carrito.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  producto: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    public cs: CarritoService
  ) {
    this.producto = JSON.parse(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.producto);
   }

  ngOnInit() {

  }

}
