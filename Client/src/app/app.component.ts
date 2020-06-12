import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicScriptLoaderService } from './shared/dynamic-script-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  title = 'agb-site';
  
constructor(private dynamicScriptsLoader: DynamicScriptLoaderService){}

  ngOnInit(){
    //this.loadScripts();
  }

  /*loadScripts(){
    this.dynamicScriptsLoader.load("mainJquery", "pluginsJquery", "scriptsJquery", "includeJquery", "revolutionJquery", "toolsJquery", "sliderJquery", "imagesLoadedJquery").then(data => {
      console.log("script loaded successfuly!");
    }).catch(error => console.log(error));

  }*/
}
