import { Component, OnInit, Inject, AfterViewInit, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { HttpEventType } from '@angular/common/http';
import { ImageText } from 'src/app/accueil/slider/slider.component';
import { PopupDeleteComponent } from '../../modifier-slider/popup-delete/popup-delete.component';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-popup-text-slide',
  templateUrl: './popup-text-slide.component.html',
  styleUrls: ['./popup-text-slide.component.css']
})
export class PopupTextSlideComponent implements OnInit {
  fileData: File = null;
  fileUploadProgress: string = null;

  imgTxt1: ImageText;
  imgTxt2: ImageText;
  imgTxt3: ImageText;
  imgTxt4: ImageText;
  imgTxt5: ImageText;

  posX: any = 0;
  posY: any = 0;


  validate: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public dataText: {path: string, slide: string}, private dataStorageService: DataSotrageService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {

    this.getTextImage();
    
  }


  onDragEnded(event: CdkDragEnd){
    //this.dataStorageService.saveTextPosition(event.x, event.y);
    console.log("x = " + event.source.getFreeDragPosition().x);
    console.log("y = " + event.source.getFreeDragPosition().y);

    this.posX = event.source.getFreeDragPosition().x;
    this.posY = event.source.getFreeDragPosition().y;
  }

  onSubmitPosition(position: {Image: any, PosX: any, PosY: any, NumSlide: string}){
    this.dataStorageService.updatePosition(position).subscribe(result => {
      alert("Position enregistée");
      this.dialog.closeAll();
    });
  }


  onSubmitUpload(slide: string){
    let formData = new FormData();
    if (this.fileData === null) {
      return;
    }

      var file = this.fileData;
      formData.append('Image', file);
      formData.append('NumSlide', slide);

      this.fileUploadProgress = '0%';
 
    this.dataStorageService.postTextImagesToServer(formData)
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        
          this.fileUploadProgress = '';
          console.log(events.body);         
          alert('SUCCESS !!');

          this.getTextImage();
          this.getDesiredImageText(slide);
          this.validate = true;
      }
         
    });
    
  }

  supprimerImageText(id: any, slide: string){
    console.log("id = " + id);
    const dialogDelete = this.dialog.open(PopupDeleteComponent);
    dialogDelete.afterClosed().subscribe( arg => {
      if(arg === true){
        this.dataStorageService.deleteTextImageFromServer(id).subscribe( result => {
          console.log(result);
          alert("Suppression réussie !");
          this.dialog.closeAll();
        });
      }
  });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];

}

getTextImage(){
  this.dataStorageService.getTextImagesFromServer().subscribe(results => {

    for (const res of results) {
      if(res != null && res.slideName == "Slide1"){
        this.imgTxt1 = res;
      }
      else if(res != null && res.slideName == "Slide2"){
        this.imgTxt2= res;
      }
      else if(res != null && res.slideName == "Slide3"){
        this.imgTxt3= res;
      }
      else if(res != null && res.slideName == "Slide4"){
        this.imgTxt4= res;
      }
      else if(res != null && res.slideName == "Slide5"){
        this.imgTxt5= res;
      }
    }
  });
}

getDesiredImageText(numSlide: string): ImageText{
  
  if(this.imgTxt1 != null && this.imgTxt1.slideName == numSlide){
    //return this.ImagePath(this.imgTxt1.imageTextPath);
    this.validate = true;
    return this.imgTxt1;
  }
  else if(this.imgTxt2 != null && this.imgTxt2.slideName == numSlide){
    //return this.ImagePath(this.imgTxt2.imageTextPath);
    this.validate = true;
    return this.imgTxt2;
  }
  else if(this.imgTxt3 != null && this.imgTxt3.slideName == numSlide){
    //return this.ImagePath(this.imgTxt3.imageTextPath);
    this.validate = true;
    return this.imgTxt3;
  }
  else if(this.imgTxt4 != null && this.imgTxt4.slideName == numSlide){
    //return this.ImagePath(this.imgTxt4.imageTextPath);
    this.validate = true;
    return this.imgTxt4;
  }
  else if(this.imgTxt5 != null && this.imgTxt5.slideName == numSlide){
    //return this.ImagePath(this.imgTxt5.imageTextPath);
    this.validate = true;
    return this.imgTxt5;
  }
  else {
    this.validate = false;
    return null;
  }

}

ImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2;
}

}
