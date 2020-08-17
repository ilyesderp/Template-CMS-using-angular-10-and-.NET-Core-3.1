import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { ProduitsEtServicesComponent } from './produits-et-services/produits-et-services.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { CategorieComponent } from './produits-et-services/categorie/categorie.component';
import { ProduitComponent } from './produits-et-services/produit/produit.component';


const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'qui-sommes-nous', component: QuiSommesNousComponent},
  {path: 'produits-et-services', component: ProduitsEtServicesComponent}, 
  {path: 'produits-et-services/categories/:etiq1/:etiq2/:titre', component: CategorieComponent},
  {path: 'produits-et-services/produits/:etiq1/:etiq2/:titre', component: ProduitComponent},
  {path: 'auth', component: AuthentificationComponent},
  {path: 'admin-panel', loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
