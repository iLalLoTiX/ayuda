import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModealAyudaPage } from './modeal-ayuda.page';

const routes: Routes = [
  {
    path: '',
    component: ModealAyudaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModealAyudaPageRoutingModule {}
