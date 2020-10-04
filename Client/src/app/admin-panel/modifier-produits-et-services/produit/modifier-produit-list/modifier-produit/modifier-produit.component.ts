import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-produit',
  templateUrl: './modifier-produit.component.html',
  styleUrls: ['./modifier-produit.component.css']
})
export class ModifierProduitComponent implements OnInit {
  selectedProduct: {
    id: any;
    titre: string;
    entete: string;
    miniature: string;
    categorie: string;
    onglet1: string;
    onglet2: string;
    onglet3: string;
    onglet4: string;
    etiquette1: string;
    etiquette2: string;
    state: string;
} = {
  id: '',
  titre: '',
  entete: '',
  miniature: '',
  categorie: '',
  onglet1: '',
  onglet2: '',
  onglet3: '',
  onglet4: '',
  etiquette1: '',
  etiquette2: '',
  state: ''
};

  enteteFileData: File =null;
  miniatureFileData: File =null;
  toggleReadOnly: boolean = false;
  locked: boolean = false;
  toggleModifierBtn: boolean = true;

  @ViewChild('productForm') formulaire: NgForm;

    allProducts: {
      id: any, 
      titre: string, 
      entete: string,
      miniature: string, 
      categorie: string, 
      onglet1: string, 
      onglet2: string, 
      onglet3: string, 
      onglet4: string,
      etiquette1: string,
      etiquette2: string,
      state: string
}[] = [];

  onglet1: string;
  onglet2: string;
  onglet3: string;
  onglet4: string;

  autre1: string = '';
  autre2: string = '';
  autre3: string = '';
  autre4: string = '';

  

 
constructor(private dataStorageService: DataSotrageService, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.locked = true;
  this.getselectedProduct();
}

modifier(){
  this.locked = false;
  this.toggleModifierBtn = false;
}

annuler(){
  this.locked = true;
  this.toggleModifierBtn = true;
}

getselectedProduct(){

  this.route.queryParams.subscribe(params => {
    
      //if(categ.id == params['id']){
        //this.selectedProduct = categ;
        //need to look for product by id on server
        //here: ...
      this.dataStorageService.getProductById(params.id).subscribe(result => {
        console.log(result);
        this.selectedProduct = result;
      });
  });
}







fileProgressEntete(fileInput: any){
  this.enteteFileData = <File>fileInput.target.files[0];
}

fileProgressMiniature(fileInput: any){
  this.miniatureFileData = <File>fileInput.target.files[0];
}

onSubmitProduit(){

  let formData: FormData = new FormData();

  if(this.formulaire.value.titre == ''){
    formData.append("titre", this.selectedProduct.titre);
  }
  else{
    formData.append("titre", this.formulaire.value.titre);
  }
  

  if(this.miniatureFileData == null){
    formData.append("miniature", this.selectedProduct.miniature);
  }
  else{
    formData.append("miniature", this.miniatureFileData);
  }
  
  if(this.enteteFileData == null){
    formData.append("entete", this.selectedProduct.entete);
  }
  else{
    formData.append("entete", this.enteteFileData);
  }


  //formData.append("state", "active");
  formData.append("id", this.selectedProduct.id);

  
  this.dataStorageService.patchCategorie(formData).subscribe((result) => {
    console.log(result);
    
      alert("Produit Modifiée");

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
