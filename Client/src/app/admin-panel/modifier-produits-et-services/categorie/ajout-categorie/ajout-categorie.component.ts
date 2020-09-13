import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-ajout-categorie',
  templateUrl: './ajout-categorie.component.html',
  styleUrls: ['./ajout-categorie.component.css']
})
export class AjoutCategorieComponent implements OnInit {

  @ViewChild('categoryForm') formulaire: NgForm;

  etiquette1: string;
  etiquette2: string;
  isSousCategorie: boolean = false;
  categorieParente: string = '';

  allcategorieParentes: {id: any, titre: string, 
    entete: string, 
    parent: string, 
    children: string, 
    etiquette1: string, 
    etiquette2: string, 
    miniature: string,
    produits: string;}[] = [];

  enteteFileData: File =null;
  miniatureFileData: File =null;
  toggleReadOnly: boolean = false;

 
constructor(private dataStorageService: DataSotrageService) { }

ngOnInit(): void {
  this.getAllCategories();
}


toggleCheckBox(value: MatCheckboxChange){
  this.isSousCategorie = value.checked;
  if(this.isSousCategorie == false){
    this.categorieParente = '';
    this.toggleReadOnly = false;
  }
  else if(this.isSousCategorie == true){
    this.toggleReadOnly = true;
  }
}


parentSelected(selected: any){
  
  this.categorieParente = selected.value;
  for (let item of this.allcategorieParentes) {
    if(this.categorieParente != '' && item.titre == this.categorieParente){
      this.etiquette1 = item.etiquette1;
      this.etiquette2 = item.etiquette2;
      //this.changeDetection.detectChanges();
    }
  }
  //this.changeDetection.detach();
}



getAllCategories(){
  this.dataStorageService.getAllCategoriesFromServer().subscribe( (results) => {
    this.allcategorieParentes = results;
  });
}



fileProgressEntete(fileInput: any){
  this.enteteFileData = <File>fileInput.target.files[0];
}

fileProgressMiniature(fileInput: any){
  this.miniatureFileData = <File>fileInput.target.files[0];
}

onSubmitCategorie(){

  if (this.enteteFileData === null || this.miniatureFileData === null) {
    alert("Veuillez charger une image!");
    return;
  }

  let formData: FormData = new FormData();

  formData.append("titre", this.formulaire.value.titre);

  formData.append("miniature", this.miniatureFileData);

  

  formData.append("entete", this.enteteFileData);

  if(!this.isSousCategorie){
    formData.append("categorieParente", "none");
    formData.append("etiquette1", this.formulaire.value.etiquette1);
    formData.append("etiquette2", this.formulaire.value.etiquette2);
  }
  else{
    formData.append("categorieParente", this.formulaire.value.categorieParente);
    formData.append("etiquette1", this.etiquette1);
    formData.append("etiquette2", this.etiquette2);
  }

  formData.append("state", "active");

  
  this.dataStorageService.postCategorie(formData).subscribe((result) => {
    console.log(result);
    
    if(result != "exists"){
      //this.formulaire.resetForm();
      alert("Catégorie Créée");
      //this.getAllCategories();
      //this.parentSelected(this.formulaire.value.categorieParente);

      location.reload();
      
    }
    else{
      alert("Cette catégorie existe déja!");
    }
      
  });
  
}


}
