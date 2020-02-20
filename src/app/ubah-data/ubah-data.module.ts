import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbahDataPageRoutingModule } from './ubah-data-routing.module';

import { UbahDataPage } from './ubah-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbahDataPageRoutingModule
  ],
  declarations: [UbahDataPage]
})
export class UbahDataPageModule {}
