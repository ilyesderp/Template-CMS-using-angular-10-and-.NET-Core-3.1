import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { ResolveStart } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-youtube-vid',
  templateUrl: './youtube-vid.component.html',
  styleUrls: ['./youtube-vid.component.css']
})
export class YoutubeVidComponent implements OnInit, AfterViewInit {

  value = '';
  ytLink: string;
  progress: number = 0;
  

  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.initYoutubeVideoAPI();
    this.getYoutubeLink();
  }

  ngAfterViewInit(){
  }

  initYoutubeVideoAPI(){
    //code to insert balise script in body for youtube api
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }


  onSubmit(){
    console.log(this.value);
  
    const video_id = this.extractVideoID(this.value);

    if(video_id != null){
      this.dataStorageService.postYoutubeLink(video_id).subscribe( result => {
          console.log(result);
          alert("Votre lien a été chargé correctement");
          this.value='';
          this.getYoutubeLink();
        });
    }
    else{
        alert("Votre lien n'est pas valide!");
    }
    
    
    
  }

  extractVideoID(url: string){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if ( match && match[7].length == 11 ){
        return match[7];
    }else{
        alert("N'a pas pu extraire l'ID video.");
    }
}

  getYoutubeLink(){
    this.dataStorageService.getYoutubeLink().subscribe( events => {
      if(events.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(events.loaded / events.total * 100);

      } else if(events.type === HttpEventType.Response) {
        
        if(events.body !== null){
          this.progress = 0;
          this.ytLink = events.body[0].youtubeId;
         
        }
      }
    });
  }

  onDelete(){
    this.dataStorageService.deleteYoutubeLink().subscribe(result => {
      alert("Suppression réussie !");
      this.ytLink = null;
    });
  }

}
