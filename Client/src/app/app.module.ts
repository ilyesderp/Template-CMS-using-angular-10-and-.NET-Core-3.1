import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccueilComponent } from './accueil/accueil.component';
import { QuiSommesNousComponent } from './qui-sommes-nous/qui-sommes-nous.component';
import { ProduitsEtServicesComponent } from './produits-et-services/produits-et-services.component';
import { SliderComponent } from './accueil/slider/slider.component';
import { ModifierSliderComponent, CustomMatPaginatorIntl } from './accueil/modifier-slider/modifier-slider.component';
import { DynamicScriptLoaderService } from './shared/dynamic-script-loader.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { PopupElementsComponent } from './accueil/modifier-slider/popup-elements/popup-elements.component';
import { PopupDeleteComponent } from './accueil/modifier-slider/popup-delete/popup-delete.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    QuiSommesNousComponent,
    ProduitsEtServicesComponent,
    SliderComponent,
    ModifierSliderComponent,
    PopupElementsComponent,
    PopupDeleteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
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
    MatDialogModule
  ],
  providers: [DynamicScriptLoaderService, { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
