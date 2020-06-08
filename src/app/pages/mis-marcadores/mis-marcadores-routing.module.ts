import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisMarcadoresPage } from './mis-marcadores.page';

const routes: Routes = [
  {
    path: '',
    component: MisMarcadoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisMarcadoresPageRoutingModule {}
