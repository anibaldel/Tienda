import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },

  { path: 'categorias/:categoria', loadChildren: './pages/categorias/categorias.module#CategoriasPageModule' },

  { path: 'ordenes', loadChildren: './pages/ordenes/ordenes.module#OrdenesPageModule' },
  { path: 'ordenes-detalle/:orden', loadChildren: './pages/ordenes-detalle/ordenes-detalle.module#OrdenesDetallePageModule' },
  { path: 'producto/:id', loadChildren: './pages/producto/producto.module#ProductoPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'por-categorias/:categoria', loadChildren: './pages/por-categorias/por-categorias.module#PorCategoriasPageModule' },
  { path: 'busqueda', loadChildren: './pages/busqueda/busqueda.module#BusquedaPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
