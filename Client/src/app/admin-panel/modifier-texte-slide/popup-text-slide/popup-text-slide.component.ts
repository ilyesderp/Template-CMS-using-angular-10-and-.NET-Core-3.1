import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-popup-text-slide',
  templateUrl: './popup-text-slide.component.html',
  styleUrls: ['./popup-text-slide.component.css']
})
export class PopupTextSlideComponent implements OnInit {
  fileData: File = null;
  fileUploadProgress: string = null;

  constructor(@Inject(MAT_DIALOG_DATA) public dataText: {path: string, slide: string}, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
  }


  onDragEnded(event){
    //this.dataStorageService.saveTextPosition(event.x, event.y);
    console.log("x = " + event.distance.x);
    console.log("y = " + event.distance.y);
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
          //this.getUploadedImages();
        
      }
         
    });
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];

}




}
