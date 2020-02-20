import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'tambah-data',
    loadChildren: () => import('./tambah-data/tambah-data.module').then( m => m.TambahDataPageModule)
  },
  {
    path: 'ubah-data/:data',
    loadChildren: () => import('./ubah-data/ubah-data.module').then( m => m.UbahDataPageModule)
  },
  {
    path: 'cari-data',
    loadChildren: () => import('./cari-data/cari-data.module').then( m => m.CariDataPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
