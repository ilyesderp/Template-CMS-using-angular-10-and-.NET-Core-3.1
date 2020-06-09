import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DynamicScriptLoaderService } from '../shared/dynamic-script-loader.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AccueilComponent implements OnInit {

  constructor(private dynamicScriptsLoader: DynamicScriptLoaderService) { }

  ngOnInit(): void {
    
  }

  

}
