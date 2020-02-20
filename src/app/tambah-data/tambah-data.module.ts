import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TambahDataPageRoutingModule } from './tambah-data-routing.module';

import { TambahDataPage } from './tambah-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TambahDataPageRoutingModule
  ],
  declarations: [TambahDataPage]
})
export class TambahDataPageModule {}
