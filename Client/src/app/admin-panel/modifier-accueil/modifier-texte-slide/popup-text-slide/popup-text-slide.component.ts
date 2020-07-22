import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataSotrageService } from '../../../../shared/data-storage.service';
import { HttpEventType } from '@angular/common/http';
import { ImageText } from '../../../../accueil/slider/slider.component';
import { PopupDeleteComponent } from '../../../modifier-accueil/modifier-slider/popup-delete/popup-delete.component';
import { CdkDragEnd } from '@angular/cdk/drag-drop';


interface DesiredImgTxt {
  [slide: string]: ImageText;
}


@Component({
  selector: 'app-popup-text-slide',
  templateUrl: './popup-text-slide.component.html',
  styleUrls: ['./popup-text-slide.component.css']
})
export class PopupTextSlideComponent implements OnInit, AfterViewInit {
  fileData: File = null;
  fileUploadProgress: string = null;

  desiredImageTextDesktop: DesiredImgTxt[] = [];
  desiredImageTextTab: DesiredImgTxt[] = [];
  desiredImageTextMobile: DesiredImgTxt[] = [];


  posX: any = 0;
  posY: any = 0;


  validateDesktop: boolean = false;
  validateTab: boolean = false;
  validateMobile: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public dataText: {path: string, slide: string, device: string}, 
              private dataStorageService: DataSotrageService, 
              public dialog: MatDialog) {}

              
  ngOnInit(){
    

  }

  ngAfterViewInit(){
    this.getTextImage();
  }


  onDragEnded(event: CdkDragEnd){
    //this.dataStorageService.saveTextPosition(event.x, event.y);
    console.log("x = " + event.source.getFreeDragPosition().x);
    console.log("y = " + event.source.getFreeDragPosition().y);

    this.posX = event.source.getFreeDragPosition().x;
    this.posY = event.source.getFreeDragPosition().y;
  }

  onSubmitPosition(position: {Image: any, PosX: any, PosY: any, NumSlide: string, Device: string}){
    this.dataStorageService.updatePosition(position).subscribe(result => {
      alert("Position enregistée");
      this.dialog.closeAll();
    });
  }


  onSubmitUpload(){
    let formData = new FormData();
    if (this.fileData === null) {
      alert("Veuillez charger une image!");
      return;
    }

      var file = this.fileData;
      formData.append('Image', file);
      formData.append('NumSlide', this.dataText.slide);
      formData.append('Device', this.dataText.device);

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
      }

          
          

          /*console.log("before if:");
          if(this.dataText.device == "desktop"){
            this.validateDesktop = true;

            console.log("validatedesktop = " + this.validateDesktop)
          }
          else if(this.dataText.device == "tablette"){
            this.validateTab = true;

          }
          else if(this.dataText.device == "mobile"){
            this.validateMobile = true;

          }*/
      
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

    console.log("results :  ");
    console.log(results);

    for(let imgTxt of results) {
      if(imgTxt.device == "desktop"){
        if(imgTxt != null){
          if(imgTxt.slideName == this.dataText.slide){
            this.validateDesktop = true;
          }
          
          this.desiredImageTextDesktop[imgTxt.slideName] = imgTxt;
          console.log("*********************************************************************");
          console.log(this.desiredImageTextDesktop[imgTxt.slideName]);
          console.log("*********************************************************************");
        }
        else {
          this.validateDesktop = false;
          this.desiredImageTextDesktop = [];
        }
      }
      else if(imgTxt.device == "tablette"){
        if(imgTxt != null){
          if(imgTxt.slideName == this.dataText.slide){
            this.validateTab = true;
          }
          this.desiredImageTextTab[imgTxt.slideName] = imgTxt;
        }
        else {
          this.validateDesktop = false;
          this.desiredImageTextTab = [];
        }
      }
      else if(imgTxt.device = "mobile"){
        if(imgTxt != null){
          if(imgTxt.slideName == this.dataText.slide){
            this.validateMobile = true;
          }
          this.desiredImageTextMobile[imgTxt.slideName] = imgTxt;
        }
        else {
          this.validateMobile = false;
          this.desiredImageTextMobile = [];
        }
      }
    }
    
  });
  
}


ImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2;
}

}
