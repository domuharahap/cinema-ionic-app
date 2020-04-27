import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowtimesPage } from './showtimes';
const routes: Routes = [
  {
    path: '',
    component: ShowtimesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowtimesRoutingModule {}
