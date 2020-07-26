import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ResizeService } from 'src/app/shared/size-detector/resize.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-popup-accueil',
  templateUrl: './popup-accueil.component.html',
  styleUrls: ['./popup-accueil.component.css']
})
export class PopupAccueilComponent implements OnInit, AfterViewInit {

  link: string = '';
  size: any;

  loader = this.loadingBar.useRef();
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: any, nom: string, youtubeId: string}, private loadingBar: LoadingBarService,
              private resizeService: ResizeService) {

                this.resizeService.onResize$.pipe(delay(0)).subscribe(x => {
                  this.size = x;
                });
              }

  ngOnInit(): void {
    this.loader.start();
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
