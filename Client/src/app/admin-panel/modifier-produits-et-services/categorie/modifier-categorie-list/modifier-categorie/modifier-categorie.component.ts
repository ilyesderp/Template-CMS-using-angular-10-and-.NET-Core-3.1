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

  let formData: FormData = new FormData();

  if(this.formulaire.value.titre == ''){
    formData.append("titre", this.selectedCategory.titre);
  }
  else{
    formData.append("titre", this.formulaire.value.titre);
  }
  

  if(this.miniatureFileData == null){
    formData.append("miniature", this.selectedCategory.miniature);
  }
  else{
    formData.append("miniature", this.miniatureFileData);
  }
  
  if(this.enteteFileData == null){
    formData.append("entete", this.selectedCategory.entete);
  }
  else{
    formData.append("entete", this.enteteFileData);
  }


  //formData.append("state", "active");
  formData.append("id", this.selectedCategory.id);

  
  this.dataStorageService.patchCategorie(formData).subscribe((result) => {
    console.log(result);
    
      alert("Catégorie Modifiée");

      //this.annuler();
      location.reload();
      
      
  });
  
    }

formatImagePath(serverPath: string){
  if(serverPath != null){
    let path2 = serverPath.replace(/\\/g, "/");
    return 'https://localhost:44324/' + path2; 
  }  
}

}
