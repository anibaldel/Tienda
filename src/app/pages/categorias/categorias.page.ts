import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  constructor( public ps: ProductoService,
               private router: Router) { }

  ngOnInit() {
  }
  porCategoria(categoria: any) {
    this.router.navigate( ['/por-categorias', JSON.stringify(categoria)]);
  }

}
