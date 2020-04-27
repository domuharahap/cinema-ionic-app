import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { BookTicketsPage } from './book-tickets';
import { BookTicketsPageRoutingModule } from './book-tickets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    BookTicketsPageRoutingModule
  ],
  declarations: [BookTicketsPage],
})
export class BookTicketsModule {}
