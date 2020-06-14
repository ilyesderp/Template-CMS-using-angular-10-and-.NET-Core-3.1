import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import {PageEvent, MatPaginatorIntl} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { PopupElementsComponent } from './popup-elements/popup-elements.component';




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
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  images: any[] = [];

  //pagination properties
  lowValue: number = 0;
  highValue: number = 8;
 
  

  
  constructor(private dataStorageService: DataSotrageService, public dialog: MatDialog) { }
   
  ngOnInit() {
    this.getUploadedImages();
  }


  openDialog(imgPath: string) {
    this.dialog.open(PopupElementsComponent, {data: imgPath});
  }

   
  fileProgress(fileInput: any) {
      this.fileData = <File[]>fileInput.target.files;

  }

   
  onSubmit() {
    let formData = new FormData();
    
    if (this.fileData.length === 0) {
      return;
    }

    for (let file of this.fileData){
      formData.append('files', file);
    }
      
     
    this.fileUploadProgress = '0%';
 
    this.dataStorageService.postImagesToServer(formData)
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        
        if(events.body !== "over100"){
          this.fileUploadProgress = '';
          console.log(events.body);         
          alert('SUCCESS !!');
          this.getUploadedImages();
        }
        else{
          alert("Vous avez dépassé 100 images chargées, vous devez supprimer quelques images avant d'en rajouter de nouvelles!");
        }
        
      }
         
    }); 
}

  getUploadedImages(){
    this.dataStorageService.getImagesFromServer()
    .subscribe( data => {
      this.images = data;
      
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
