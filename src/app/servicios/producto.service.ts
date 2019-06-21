import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  pagina = 0;
  productos: any[] = [];
  lineas: any[] = [];
  porCategoria: any[] = [];

  resultados: any[] = [];

  constructor( public http: HttpClient) {
     this.cargar_todos();
     this.cargarLineas();
   }
   cargarLineas() {
     const url = URL_SERVICIOS + '/lineas';
     this.http.get( url)
            .pipe(
             map( resp => resp ))
            .subscribe( (data: any) => {

              if (data.error) {
                // Aqui hay un problema
              } else {
                this.lineas = data.lineas;
                console.log(this.lineas);
              }
            });
   }

   cargarPorCategoria(categoria: number) {
    const url = URL_SERVICIOS + '/productos/por_tipo/' + categoria;
    this.http.get( url)
            .pipe(
             map( resp => resp ))
            .subscribe( (data: any) => {

              if (data.error) {
                // Aqui hay un problema
              } else {
                console.log(data.productos);
                this.porCategoria = data.productos;
              }

            });
   }

  cargar_todos() {

    const promesa = new Promise( ( resolve, reject ) => {

      const url = URL_SERVICIOS + '/productos/todos/' + this.pagina;

      this.http.get( url)
            .pipe(
             map( resp => resp ))
            .subscribe( (data: any) => {

              if (data.error) {
                // Aqui hay un problema
              } else {
                const nuevaData = this.agrupar( data.productos , 2);

                this.productos.push( ...nuevaData);
                this.pagina += 1;
              }

              resolve();
            });
    });

    return promesa;
  }

  private agrupar( arr: any, tamano: number ) {

    const nuevoArreglo = [];
    for ( let i = 0; i < arr.length; i += tamano ) {
      nuevoArreglo.push( arr.slice(i, i + tamano) );
    }
    console.log( nuevoArreglo );
    return nuevoArreglo;

  }

  buscarProducto( termino: string ) {

    const url = URL_SERVICIOS + '/productos/buscar/' + termino;

    this.http.get( url )
    .pipe(
      map( resp => resp ))
     .subscribe( (data: any) => {
              this.resultados = data.productos;

            });

  }

}
