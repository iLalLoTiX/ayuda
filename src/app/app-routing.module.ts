import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'modeal-ayuda',
    loadChildren: () => import('./pages/modeal-ayuda/modeal-ayuda.module').then( m => m.ModealAyudaPageModule)
  },
  {
    path: 'mis-marcadores',
    loadChildren: () => import('./pages/mis-marcadores/mis-marcadores.module').then( m => m.MisMarcadoresPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
