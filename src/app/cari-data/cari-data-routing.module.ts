import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CariDataPage } from './cari-data.page';

const routes: Routes = [
  {
    path: '',
    component: CariDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CariDataPageRoutingModule {}
