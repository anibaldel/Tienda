import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { PipesModule } from '../../pipes/pipes.module';
import { LoginPage } from '../login/login.page';
import { LoginPageModule } from '../login/login.module';
import { CarritoPage } from '../carrito/carrito.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  entryComponents: [
    LoginPage,
    CarritoPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PipesModule,
    LoginPageModule,
  ],
  declarations: [HomePage, CarritoPage]
})
export class HomePageModule {}
