import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { HttpEventType } from '@angular/common/http';
import { ImageText } from 'src/app/accueil/slider/slider.component';

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

  imgTxtUrl: string;

  constructor(@Inject(MAT_DIALOG_DATA) public dataText: {path: string, slide: string}, private dataStorageService: DataSotrageService) {
    this.getTextImage();
   }

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
          this.getTextImage();
          this.getDesiredImageText(slide);
      }
         
    });
    
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];

}

getTextImage(){
  this.dataStorageService.getTextImagesFromServer().subscribe(results => {

    console.log(results)
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

getDesiredImageText(numSlide: string){
  
  if(this.imgTxt1 != null && this.imgTxt1.slideName == numSlide){
    return this.ImagePath(this.imgTxt1.imageTextPath);
  }
  else if(this.imgTxt2 != null && this.imgTxt2.slideName == numSlide){
    return this.ImagePath(this.imgTxt2.imageTextPath);
  }
  else if(this.imgTxt3 != null && this.imgTxt3.slideName == numSlide){
    return this.ImagePath(this.imgTxt3.imageTextPath);
  }
  else if(this.imgTxt4 != null && this.imgTxt4.slideName == numSlide){
    return this.ImagePath(this.imgTxt4.imageTextPath);
  }
  else if(this.imgTxt5 != null && this.imgTxt5.slideName == numSlide){
    return this.ImagePath(this.imgTxt5.imageTextPath);
  }
  else return '';

}

ImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2;
}

}
