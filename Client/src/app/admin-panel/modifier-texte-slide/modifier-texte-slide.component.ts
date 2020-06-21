import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { PopupTextSlideComponent } from './popup-text-slide/popup-text-slide.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modifier-texte-slide',
  templateUrl: './modifier-texte-slide.component.html',
  styleUrls: ['./modifier-texte-slide.component.css']
})
export class ModifierTexteSlideComponent implements OnInit {

  images: any[];


  constructor(private dataStorageService: DataSotrageService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSlidesAccueil();
  }


  getSlidesAccueil(){
    this.dataStorageService.getSlidesFromServer().subscribe(results => {
      this.images = results;
    });
  }


  openDialog(imgPath: string) {
    this.dialog.open(PopupTextSlideComponent, {data: imgPath});
  }

}
