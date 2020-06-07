import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModealAyudaPageRoutingModule } from './modeal-ayuda-routing.module';

import { ModealAyudaPage } from './modeal-ayuda.page';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    ModealAyudaPageRoutingModule
  ],
  declarations: [ModealAyudaPage]
})
export class ModealAyudaPageModule {}
