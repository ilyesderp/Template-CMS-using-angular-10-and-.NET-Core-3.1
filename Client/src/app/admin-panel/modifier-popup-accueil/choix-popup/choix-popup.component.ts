import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-choix-popup',
  templateUrl: './choix-popup.component.html',
  styleUrls: ['./choix-popup.component.css']
})
export class ChoixPopupComponent implements OnInit {

  actuel: string = '';
  disableYt: boolean = false;
  disableImg: boolean = false;
  disableAucun: boolean = false;


  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getCurrentPopup();
  }

  getCurrentPopup(){
    this.dataStorageService.getChoixPopup().subscribe(data => {
      if(data == "ytvid"){
        this.actuel = "popup video youtube";
        this.disableYt = true;
        this.disableImg= false;
        this.disableAucun = false;
      }
      else if(data == "customImg"){
        this.actuel = "popup image";
        this.disableYt = false;
        this.disableImg= true;
        this.disableAucun = false;
      }
      else if(data == "aucun"){
        this.actuel= "aucun popup";
        this.disableYt = false;
        this.disableImg= false;
        this.disableAucun = true;
      }
    });
  }

  chooseYoutube(){
    this.dataStorageService.postChoixPopup("ytvid").subscribe(result => {
      console.log(result);
      alert("Le popup choisi est: video Youtube.")
      this.getCurrentPopup();
    });
    
  }

  chooseImage(){
    this.dataStorageService.postChoixPopup("customImg").subscribe(result => {
      console.log(result);
      alert("Le popup choisi est: video Youtube.")
      this.getCurrentPopup();
    });
    
  }

  aucun(){
    this.dataStorageService.postChoixPopup("aucun").subscribe(result => {
      console.log(result);
      alert("le popup de la page d'accueil a été enlevé!");
      this.getCurrentPopup();
    });
  }

}
