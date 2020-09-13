import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-modifier-categorie',
  templateUrl: './modifier-categorie.component.html',
  styleUrls: ['./modifier-categorie.component.css']
})
export class ModifierCategorieComponent implements OnInit {

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
    produits: string}[] = [];

  selectedCategory: {
    id: string;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;
  } = {
    id: '',
    titre: '',
    entete: '',
    parent: '',
    children: '',
    etiquette1: '',
    etiquette2: '',
    miniature: '',
    produits: ''
};

  enteteFileData: File =null;
  miniatureFileData: File =null;
  toggleReadOnly: boolean = false;
  locked: boolean = false;
  toggleModifierBtn: boolean = true;
  

 
constructor(private dataStorageService: DataSotrageService, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.locked = true;
  this.getAllCategories();
}

modifier(){
  this.locked = false;
  this.toggleModifierBtn = false;
}

annuler(){
  this.locked = true;
  this.toggleModifierBtn = true;
}

getSelectedCategory(){

  this.route.queryParams.subscribe(params => {
    for (let categ of this.allcategorieParentes) {
      if(categ.id == params['id']){
        this.selectedCategory = categ;
        if(categ.parent != 'none'){
          this.isSousCategorie = true;
        }
        else{
          this.isSousCategorie = false;
        }
      }
    }
  });
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

    this.getSelectedCategory();
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

  //formData.append("state", "active");
  formData.append("id", this.selectedCategory.id);

  
  this.dataStorageService.patchCategorie(formData).subscribe((result) => {
    console.log(result);
    
      alert("Catégorie Modifiée");

      //location.reload();
      this.annuler();
      
  });
  
    }

formatImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
return 'https://localhost:44324/' + path2; 
}

}
