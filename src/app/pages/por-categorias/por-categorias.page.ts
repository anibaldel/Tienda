import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';

@Component({
  selector: 'app-por-categorias',
  templateUrl: './por-categorias.page.html',
  styleUrls: ['./por-categorias.page.scss'],
})
export class PorCategoriasPage implements OnInit {
  categoria: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              public ps: ProductoService,
              private router: Router) {
    this.categoria = JSON.parse(this.activatedRoute.snapshot.paramMap.get('categoria'));
    this.ps.cargarPorCategoria( this.categoria.id);
   }

  ngOnInit() {
  }
  enviarProducto(item: any) {
    this.router.navigate( ['/producto', JSON.stringify(item)]);
  }
}
