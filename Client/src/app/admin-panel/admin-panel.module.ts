import {NgModule} from '@angular/core';
import { AdminHeaderComponent } from '../admin-panel/admin-header/admin-header.component';
import { AdminPanelComponent } from './admin-panel.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { SideNav } from './admin-header/side-nav/side-nav.component';
import { ModifierAccueilComponent } from './modifier-accueil/modifier-accueil.component';
import { ModifierQuiSommesNousComponent } from './modifier-qui-sommes-nous/modifier-qui-sommes-nous.component';
import { ModifierProduitsEtServicesComponent } from './modifier-produits-et-services/modifier-produits-et-services.component';
import { ModifierTexteSlideComponent } from './modifier-accueil/modifier-texte-slide/modifier-texte-slide.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PopupTextSlideComponent } from './modifier-accueil/modifier-texte-slide/popup-text-slide/popup-text-slide.component';
import { ModifierSliderComponent, CustomMatPaginatorIntl } from './modifier-accueil/modifier-slider/modifier-slider.component';
import { PopupElementsComponent } from './modifier-accueil/modifier-slider/popup-elements/popup-elements.component';
import { PopupDeleteComponent } from './modifier-accueil/modifier-slider/popup-delete/popup-delete.component';
import { ModifierPopupAccueilComponent } from './modifier-popup-accueil/modifier-popup-accueil.component';
import { SideNavPopupComponent } from './admin-header/side-nav-popup/side-nav-popup.component';
import { YoutubeVidComponent } from './modifier-popup-accueil/youtube-vid/youtube-vid.component';
import { CustomVidComponent } from './modifier-popup-accueil/custom-vid/custom-vid.component';
import { CustomImgComponent } from './modifier-popup-accueil/custom-img/custom-img.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ChoixPopupComponent } from './modifier-popup-accueil/choix-popup/choix-popup.component';
// for HttpClient import:
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SideNavProduitsComponent } from './admin-header/side-nav-produits/side-nav-produits.component';
import { AjoutProduitComponent } from './modifier-produits-et-services/produit/ajout-produit/ajout-produit.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { AjoutCategorieComponent } from './modifier-produits-et-services/categorie/ajout-categorie/ajout-categorie.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ModifierCategorieComponent } from './modifier-produits-et-services/categorie/modifier-categorie-list/modifier-categorie/modifier-categorie.component';
import { ModifierCategorieListComponent } from './modifier-produits-et-services/categorie/modifier-categorie-list/modifier-categorie-list.component';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';



//routing is integrated in AdminPanelModule file not like in AppModule
const adminRoutes: Routes = [
    {path: '', component: AdminPanelComponent, children: [
        {path: 'modifier-popup', component: ModifierPopupAccueilComponent, children: [
            {path: 'modifier-popup-yt-video', component: YoutubeVidComponent},
            {path: 'modifier-popup-image', component: CustomImgComponent},
            {path: 'modifier-popup-video', component: CustomVidComponent},
            {path: 'choix-popup', component: ChoixPopupComponent}
        ]},
        {path: 'modifier-accueil', component: ModifierAccueilComponent, children: [
            {path: 'modifier-slider', component: ModifierSliderComponent},
            {path: 'modifier-texte-slider', component: ModifierTexteSlideComponent}
        ]},
        {path: 'modifier-qui-sommes-nous', component: ModifierQuiSommesNousComponent},
        {path: 'modifier-produits-et-services', component: ModifierProduitsEtServicesComponent, children: [
            {path: 'ajouter-produit', component: AjoutProduitComponent},
            {path: 'modifier-categorie-list', component: ModifierCategorieListComponent},
            {path: 'ajouter-categorie', component: AjoutCategorieComponent},
            {path: 'modifier-categorie', component: ModifierCategorieComponent}
        ]}
    ]}  
]


@NgModule({
    declarations: [
        ModifierSliderComponent,
        PopupElementsComponent,
        PopupDeleteComponent,
        AdminHeaderComponent,
        SideNav,
        AdminPanelComponent,
        ModifierAccueilComponent,
        ModifierQuiSommesNousComponent,
        ModifierProduitsEtServicesComponent,
        ModifierTexteSlideComponent,
        PopupTextSlideComponent,
        ModifierPopupAccueilComponent,
        SideNavPopupComponent,
        YoutubeVidComponent,
        CustomVidComponent,
        CustomImgComponent,
        ChoixPopupComponent,
        SideNavProduitsComponent,
        AjoutProduitComponent,
        AjoutCategorieComponent,
        ModifierCategorieComponent,
        ModifierCategorieListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        FormsModule,
        MaterialFileInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatPaginatorModule,
        MatCardModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        DragDropModule,
        YouTubePlayerModule,
        MatInputModule,
        MatProgressBarModule,
        LoadingBarHttpClientModule,
        LoadingBarModule,
        MatButtonToggleModule,
        NgxTinymceModule.forRoot({
            baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.3.2/',
          }),
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        MatSortModule
    ],

    providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class AdminPanelModule{

}