import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MoviesPage } from './movies';
import { MoviesPageRoutingModule } from './movies-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MoviesPageRoutingModule
  ],
  declarations: [MoviesPage],
})
export class MoviesModule {}
