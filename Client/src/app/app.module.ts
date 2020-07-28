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
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { AuthentificationComponent } from './authentification/authentification.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupAccueilComponent } from './accueil/popup-accueil/popup-accueil.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PopupAcceuilImgComponent } from './accueil/popup-acceuil-img/popup-acceuil-img.component';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SizeDetectorComponent } from './shared/size-detector/size-detector.component';
import { NgxFlagPickerModule } from 'ngx-flag-picker';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    QuiSommesNousComponent,
    ProduitsEtServicesComponent,
    SliderComponent,
    AuthentificationComponent,
    PopupAccueilComponent,
    PopupAcceuilImgComponent,
    SizeDetectorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AdminPanelModule,
    HttpClientModule,
    MatDialogModule,
    YouTubePlayerModule,
    MatButtonModule,
    MatProgressBarModule,
    LoadingBarModule,
    NgxFlagPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
