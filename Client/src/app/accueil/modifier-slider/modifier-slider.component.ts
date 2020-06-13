import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import {PageEvent} from '@angular/material/paginator';






@Component({
  selector: 'app-modifier-slider',
  templateUrl: './modifier-slider.component.html',
  styleUrls: ['./modifier-slider.component.css']
})
export class ModifierSliderComponent implements OnInit {
  
  fileData: File[] = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  images: any[] = [];
  pageEvent: PageEvent;
  

  
  constructor(private dataStorageService: DataSotrageService, private http: HttpClient) { }
   
  ngOnInit() {
    this.getUploadedImages();
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
        
        this.fileUploadProgress = '';
        console.log(events.body);         
        alert('SUCCESS !!');
        this.getUploadedImages();
      }
         
    }) 
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

}
