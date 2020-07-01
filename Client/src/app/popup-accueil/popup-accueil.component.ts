import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-accueil',
  templateUrl: './popup-accueil.component.html',
  styleUrls: ['./popup-accueil.component.css']
})
export class PopupAccueilComponent implements OnInit, AfterViewInit {

  link: string = '';


  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: any, nom: string, youtubeId: string}) { }

  ngOnInit(): void {
    this.setYoutubeLinkToView();
  }

  ngAfterViewInit(){
    this.initYoutubeVideoAPI();
  }

  initYoutubeVideoAPI(){
    //code to insert balise script in body for youtube api
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }

  setYoutubeLinkToView(){
    console.log(this.data.youtubeId)
    this.link = this.data.youtubeId;
    console.log("link = "+ this.link);
  }

}
