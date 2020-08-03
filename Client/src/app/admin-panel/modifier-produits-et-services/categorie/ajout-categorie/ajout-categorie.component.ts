import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {

  etiquette1: string;
  etiquette2: string;
  isSousCategorie: boolean = false;
  categorieParente: string = '';

 
constructor(private dataStorageService: DataSotrageService) { }

ngOnInit(): void {
}

createProduct(form: NgForm){
  console.log(form);
}

toggleCheckBox(value: MatCheckboxChange){
  this.isSousCategorie = value.checked;
  if(this.isSousCategorie == false){
    this.categorieParente = '';
  }
}

onSubmitCategorie(){

  //this.dataStorageService.postCategorie().subscribe();
}

}
