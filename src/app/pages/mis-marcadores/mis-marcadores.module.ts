import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisMarcadoresPageRoutingModule } from './mis-marcadores-routing.module';

import { MisMarcadoresPage } from './mis-marcadores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisMarcadoresPageRoutingModule
  ],
  declarations: [MisMarcadoresPage]
})
export class MisMarcadoresPageModule {}
