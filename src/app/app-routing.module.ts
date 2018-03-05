import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { DetalleObraComponent } from './componentes/galeria/detalle-obra/detalle-obra.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GaleriaComponent},
  { path: 'gallery/:id', component: DetalleObraComponent },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
