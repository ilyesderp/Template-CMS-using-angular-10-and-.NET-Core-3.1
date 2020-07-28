import { Component, OnInit, Injectable } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import {PageEvent, MatPaginatorIntl} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { PopupElementsComponent } from './popup-elements/popup-elements.component';
import { PopupDeleteComponent } from './popup-delete/popup-delete.component';




//classe pour traduire le paginator.
@Injectable({
  providedIn: 'root',
})
export class CustomMatPaginatorIntl extends MatPaginatorIntl {

  itemsPerPageLabel = 'Elements par page';
  
  getRangeLabel = (page: number, pageSize: number, length: number) => { 
      if (length == 0 || pageSize == 0) { 
          return `0 of ${length}`; } length = Math.max(length, 0); 
          const startIndex = page * pageSize; 
          const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; 
          return `${startIndex + 1} – ${endIndex} sur ${length}`; 
        }
    
  nextPageLabel = "Page suivante";
  previousPageLabel ="Page précedante";
  lastPageLabel = "Dérnière page";
  firstPageLabel = "Première page";
}


@Component({
  selector: 'app-modifier-slider',
  templateUrl: './modifier-slider.component.html',
  styleUrls: ['./modifier-slider.component.css']
})
export class ModifierSliderComponent implements OnInit{
  
  fileData: File[] = null;
  previewUrl:any = null;
  fileUploadProgress: number = null;
  uploadedFilePath: string = null;
  images: any[] = []; //will hold all images for all devices
  imagesDesktop: any[] = [];
  imagesTablette: any[] = [];
  imagesMobile: any[] = [];

  //pagination properties
  lowValue: number = 0;
  highValue: number = 8;
  value = '';



 

  
  constructor(private dataStorageService: DataSotrageService, public dialog: MatDialog) { }
   
  ngOnInit() {
    this.getUploadedImages();
  }

  supprimerImage(imgPath: string, id: any){
    const dialogDelete = this.dialog.open(PopupDeleteComponent, {data: imgPath});
    dialogDelete.afterClosed().subscribe(result => {
      if(result === true){
            for (const image of this.images) {
              if((this.ImagePath(image.imagePath) == imgPath) && (image.id == id)){ //find id of the image to be deleted and send it through delete request.
                this.dataStorageService.deleteImageInService(image.id).subscribe(response => {//here problem deleting images.
                  
                  if(response == 'Slide1' || response =='Slide2' || response =='Slide3' || response =='Slide4' || response =='Slide5'){
                    alert("Vous ne pouvez pas supprimer cette image car elle est utilisée dans: "+ response +", vous devez devez d'abord changer l'image utilisée.");
                  }else{
                    this.getUploadedImages();
                  }
                  
                  
              });
              }
            }
      }
    });
    
  }


  openDialog(imgPath: string, resolution: string) {
    this.dialog.open(PopupElementsComponent, {data: {img: imgPath, device: resolution}});
  }

   
  fileProgress(fileInput: any) {
      this.fileData = <File[]>fileInput.target.files;

  }

   
  onSubmit(device: string) {
    let formData = new FormData();
    
    if (this.fileData.length === 0) {
      return;
    }

    for (let file of this.fileData){
      formData.append('Images', file);
      formData.append('Device', device);
    }
      
     
    this.fileUploadProgress = 0;
 
    this.dataStorageService.postImagesToServer(formData)
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100);
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        
        if(events.body !== "over100" && events.body !== "exist"){
          this.fileUploadProgress = 0;
          console.log(events.body);         
          alert('SUCCESS !!');
          
          this.getUploadedImages();
          this.value = '';
        }
        else if(events.body === "over100"){
          this.fileUploadProgress = 0;
          alert("Vous avez dépassé 100 images chargées, vous devez supprimer quelques images avant d'en rajouter de nouvelles!");
        }

        /*else if(events.body === "exist"){
          this.fileUploadProgress = '';
          alert("Une des images chargées existe déja!");
          this.getUploadedImages();
        }*/
        
      }
         
    });
}

  getUploadedImages(){
    this.dataStorageService.getImagesFromServer()
    .subscribe( data => {
      // fill images variable with all images then separte them is different variables
      this.images = data;

      let desktopArray: any[] = [];
      let tabArray: any[] = [];
      let mobileArray: any[] = [];

      for (const img of data) {
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
  


  
ImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2;
}


public getPaginatorData(event: PageEvent): PageEvent {
  this.lowValue = event.pageIndex * event.pageSize;
  this.highValue = this.lowValue + event.pageSize;
  return event;
}


}
