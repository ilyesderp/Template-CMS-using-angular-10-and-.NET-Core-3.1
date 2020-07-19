import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from '../../../shared/data-storage.service';
import { PopupTextSlideComponent } from './popup-text-slide/popup-text-slide.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modifier-texte-slide',
  templateUrl: './modifier-texte-slide.component.html',
  styleUrls: ['./modifier-texte-slide.component.css']
})
export class ModifierTexteSlideComponent implements OnInit {

  images: any[];
  imagesDesktop: any[];
  imagesTablette: any[];
  imagesMobile: any[];


  constructor(private dataStorageService: DataSotrageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSlidesAccueil();
  }


  getSlidesAccueil(){
    this.dataStorageService.getSlidesFromServer().subscribe(results => {
      this.images = results;

      let desktopArray: any[] = [];
      let tabArray: any[] = [];
      let mobileArray: any[] = [];

      for (const img of results) {
        if(img.device == "desktop"){
          desktopArray.push(img);
          
        }
        else if(img.device == "tablette"){
          tabArray.push(img);
          
        }
        else if(img.device == "mobile"){
          mobileArray.push(img);
          
        }
      }
      this.imagesDesktop = desktopArray;
      this.imagesTablette = tabArray;
      this.imagesMobile = mobileArray;
    });
  }


  openDialog(imgPath: string, numSlide: string, resolution: string) {
    this.dialog.open(PopupTextSlideComponent, {data: {path: imgPath, slide: numSlide, device: resolution}});
  }

}
