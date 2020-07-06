import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-acceuil-img',
  templateUrl: './popup-acceuil-img.component.html',
  styleUrls: ['./popup-acceuil-img.component.css']
})
export class PopupAcceuilImgComponent implements OnInit {

  imgPath: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.setImagePathToView();
  }
  

  setImagePathToView(){
    this.imgPath = this.ImagePath(this.data);
  }

  ImagePath(serverPath: string){
    let path2 = serverPath.replace(/\\/g, "/");
    return 'https://localhost:44324/' + path2;
  }
}
