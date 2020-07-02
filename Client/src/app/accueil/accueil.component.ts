import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../shared/navbar.service';
import { DataSotrageService } from '../shared/data-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupAccueilComponent } from './popup-accueil/popup-accueil.component';
import { PopupAcceuilImgComponent } from './popup-acceuil-img/popup-acceuil-img.component';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {

  constructor(public headerService: HeaderService, private dataStorageService: DataSotrageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.headerService.show();
    this.showPopupYoutubeVideo();
  }


  showPopupYoutubeVideo(){
    this.dataStorageService.getYoutubeLink().subscribe( result => {
     if(result.type === HttpEventType.Response){
      if(result.body[0] != null){
        this.dialog.open(PopupAccueilComponent, {data: result.body[0], width: '90vw',
        maxHeight: '100vh'});
      }
     } 
    });
  }


  showPopupImage(){
    this.dataStorageService.getCustomImage().subscribe( result => {
      this.dialog.open(PopupAcceuilImgComponent, {data: result.path, width: '80vw',
      maxHeight: '90vh'});
    })
  }
  

}
