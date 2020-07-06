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
      }
      else if(data == "customImg"){
        this.actuel = "popup image";
        this.disableYt = false;
        this.disableImg= true;
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

}
