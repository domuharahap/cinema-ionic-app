import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookTicketsPage } from './book-tickets';
const routes: Routes = [
  {
    path: '',
    component: BookTicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookTicketsPageRoutingModule {}
