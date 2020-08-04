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
  enteteFileData: File =null;
  miniatureFileData: File =null;

 
constructor(private dataStorageService: DataSotrageService) { }

ngOnInit(): void {
}


toggleCheckBox(value: MatCheckboxChange){
  this.isSousCategorie = value.checked;
  if(this.isSousCategorie == false){
    this.categorieParente = '';
  }
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

  formData.append("etiquette1", this.formulaire.value.etiquette1);
  formData.append("etiquette2", this.formulaire.value.etiquette2);

  formData.append("entete", this.enteteFileData);

  if(this.formulaire.value.checkSousCat == ""){
    formData.append("categorieParente", "none");
  }
  else{
    formData.append("categorieParente", this.formulaire.value.categorieParente);
  }

  
  this.dataStorageService.postCategorie(formData).subscribe( (result) => {
    console.log(result);
    
    if(result != "exists"){
      this.formulaire.resetForm();
      alert("Catégorie Créée");
    }
    else{
      alert("Cette catégorie existe déja!");
    }
      
  });
  
}

}
