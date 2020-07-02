import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-custom-img',
  templateUrl: './custom-img.component.html',
  styleUrls: ['./custom-img.component.css']
})
export class CustomImgComponent implements OnInit {

  value = '';
  fileData: File = null;
  fileUploadProgress: string = null;
  imgPath: string = '';

  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getCustomImageFromServer();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onSubmitUpload(){
    let formData = new FormData();
    if (this.fileData === null) {
      return;
    }

      var file = this.fileData;
      formData.append('Image', file);

      this.fileUploadProgress = '0%';
 
    this.dataStorageService.postCustomImage(formData)
    .subscribe(events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        console.log(this.fileUploadProgress);
      } else if(events.type === HttpEventType.Response) {
        
          this.fileUploadProgress = '';
         
          alert('SUCCESS !!');
          this.value='';
          
          this.getCustomImageFromServer();
          //this.validate = true;
      }
         
    });
    
  }

  ImagePath(serverPath: string){
    let path2 = serverPath.replace(/\\/g, "/");
    return 'https://localhost:44324/' + path2;
  }

  onDelete(){
    this.dataStorageService.deleteCustomImage().subscribe( result => {
      console.log(result);
      this.imgPath = '';
    });
  }

  getCustomImageFromServer(){
    this.dataStorageService.getCustomImage().subscribe(result => {  
      this.imgPath = this.ImagePath(result.path);
    });
  }

}
