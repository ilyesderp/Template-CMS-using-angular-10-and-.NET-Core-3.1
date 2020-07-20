import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DataSotrageService } from '../../../../shared/data-storage.service';
import { HttpEventType } from '@angular/common/http';
import { ImageText } from '../../../../accueil/slider/slider.component';
import { PopupDeleteComponent } from '../../../modifier-accueil/modifier-slider/popup-delete/popup-delete.component';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-popup-text-slide',
  templateUrl: './popup-text-slide.component.html',
  styleUrls: ['./popup-text-slide.component.css']
})
export class PopupTextSlideComponent implements OnInit {
  fileData: File = null;
  fileUploadProgress: string = null;

  imgTxtDesktop: ImageText[] = [];
  imgTxtTab: ImageText[] = [];
  imgTxtMobile: ImageText[] = [];

  posX: any = 0;
  posY: any = 0;


  validateDesktop: boolean;
  validateTab: boolean;
  validateMobile: boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public dataText: {path: string, slide: string, device: string}, 
              private dataStorageService: DataSotrageService, 
              public dialog: MatDialog,
              private cdRef:ChangeDetectorRef) {}

              
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

  onSubmitPosition(position: {Image: any, PosX: any, PosY: any, NumSlide: string, Device: string}){
    this.dataStorageService.updatePosition(position).subscribe(result => {
      alert("Position enregistée");
      this.dialog.closeAll();
    });
  }


  onSubmitUpload(slide: string, device: string){
    let formData = new FormData();
    if (this.fileData === null) {
      return;
    }

      var file = this.fileData;
      formData.append('Image', file);
      formData.append('NumSlide', slide);
      formData.append('Device', device);

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
          this.getDesiredImageText(slide, this.dataText.device);

          console.log("before if:");
          if(this.dataText.device == "desktop"){
            this.validateDesktop = true;

            console.log("validatedesktop = " + this.validateDesktop)
          }
          else if(this.dataText.device == "tablette"){
            this.validateTab = true;

          }
          else if(this.dataText.device == "mobile"){
            this.validateMobile = true;

          }
          
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
      if(res.device == "desktop"){
        if(res != null && res.slideName == "Slide1"){
          this.imgTxtDesktop.push(res);
        }
        else if(res != null && res.slideName == "Slide2"){
          this.imgTxtDesktop.push(res);
        }
        else if(res != null && res.slideName == "Slide3"){
          this.imgTxtDesktop.push(res);
        }
        else if(res != null && res.slideName == "Slide4"){
          this.imgTxtDesktop.push(res);
        }
        else if(res != null && res.slideName == "Slide5"){
          this.imgTxtDesktop.push(res);
        }
      }
      else if(res.device == "tablette"){
        if(res != null && res.slideName == "Slide1"){
          this.imgTxtTab.push(res);
        }
        else if(res != null && res.slideName == "Slide2"){
          this.imgTxtTab.push(res);
        }
        else if(res != null && res.slideName == "Slide3"){
          this.imgTxtTab.push(res);
        }
        else if(res != null && res.slideName == "Slide4"){
          this.imgTxtTab.push(res);
        }
        else if(res != null && res.slideName == "Slide5"){
          this.imgTxtTab.push(res);
        }
      }
      else if(res.device == "mobile"){
        if(res != null && res.slideName == "Slide1"){
          this.imgTxtMobile.push(res);
        }
        else if(res != null && res.slideName == "Slide2"){
          this.imgTxtMobile.push(res);
        }
        else if(res != null && res.slideName == "Slide3"){
          this.imgTxtMobile.push(res);
        }
        else if(res != null && res.slideName == "Slide4"){
          this.imgTxtMobile.push(res);
        }
        else if(res != null && res.slideName == "Slide5"){
          this.imgTxtMobile.push(res);
        }
      }
      
    }
    this.cdRef.detectChanges();
  });
}

getDesiredImageText(numSlide: string, device: string): ImageText{
  
  if(device == "desktop"){
    for (const imgTxt of this.imgTxtDesktop) {
      if(imgTxt != null && imgTxt.slideName == numSlide){
        this.validateDesktop = true;
        return imgTxt;
      }
      else {
        this.validateDesktop = false;
        return null;
      }
    }
  }
  if(device == "tablette"){
    for (const imgTxt of this.imgTxtTab) {
      if(imgTxt != null && imgTxt.slideName == numSlide){
        this.validateTab = true;
        return imgTxt;
      }
      else {
        this.validateTab = false;
        return null;
      }
    }
  }
  if(device == "mobile"){
    for (const imgTxt of this.imgTxtMobile) {
      if(imgTxt != null && imgTxt.slideName == numSlide){
        this.validateMobile = true;
        return imgTxt;
      }
      else {
        this.validateMobile = false;
        return null;
      }
    }
  }
}

ImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2;
}

}
