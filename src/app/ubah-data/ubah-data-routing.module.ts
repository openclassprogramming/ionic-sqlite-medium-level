import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahDataPage } from './ubah-data.page';

const routes: Routes = [
  {
    path: '',
    component: UbahDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbahDataPageRoutingModule {}
