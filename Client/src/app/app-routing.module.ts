import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { ProduitsEtServicesComponent } from './produits-et-services/produits-et-services.component';
import { ModifierSliderComponent } from './accueil/modifier-slider/modifier-slider.component';


const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'qui-sommes-nous', component: QuiSommesNousComponent},
  {path: 'produits-et-services', component: ProduitsEtServicesComponent},
  {path: 'modifier-slider', component: ModifierSliderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
