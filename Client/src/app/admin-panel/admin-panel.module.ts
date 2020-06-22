import {NgModule} from '@angular/core';
import { AdminHeaderComponent } from '../admin-panel/admin-header/admin-header.component';
import { AdminPanelComponent } from './admin-panel.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ModifierTexteSlideComponent } from './modifier-texte-slide/modifier-texte-slide.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PopupTextSlideComponent } from './modifier-texte-slide/popup-text-slide/popup-text-slide.component';
import { ModifierSliderComponent, CustomMatPaginatorIntl } from './modifier-slider/modifier-slider.component';
import { PopupElementsComponent } from './modifier-slider/popup-elements/popup-elements.component';
import { PopupDeleteComponent } from './modifier-slider/popup-delete/popup-delete.component';



//routing is integrated in AdminPanelModule file not like in AppModule
const adminRoutes: Routes = [
    {path: 'admin-panel', component: AdminPanelComponent, children: [
        {path: 'modifier-accueil', component: ModifierAccueilComponent, children: [
            {path: 'modifier-slider', component: ModifierSliderComponent},
            {path: 'modifier-texte-slider', component: ModifierTexteSlideComponent}
        ]},
        {path: 'modifier-qui-sommes-nous', component: ModifierQuiSommesNousComponent},
        {path: 'modifier-produits-et-services', component: ModifierProduitsEtServicesComponent}
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
        PopupTextSlideComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes),
        FormsModule,
        HttpClientModule,
        MaterialFileInputModule,
        BrowserAnimationsModule,
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
        DragDropModule
    ],

    providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}]
})
export class AdminPanelModule{

}