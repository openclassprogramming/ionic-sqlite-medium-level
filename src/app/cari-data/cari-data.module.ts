import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CariDataPageRoutingModule } from './cari-data-routing.module';

import { CariDataPage } from './cari-data.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    CariDataPageRoutingModule
  ],
  declarations: [CariDataPage]
})
export class CariDataPageModule { }
