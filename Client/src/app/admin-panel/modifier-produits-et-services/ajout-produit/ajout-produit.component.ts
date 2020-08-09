import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  config: any = {
    maxLenght: 10,
    height: 250,
    width: 950,
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    language: "fr_FR",
    language_url : '/assets/tinymce/langs/fr_FR.js'
  };


  @ViewChild('productForm') formulaire: NgForm;
  enteteFileData: File = null;
  categorieParente: string = '';
  allcategories: {id: any, titre: string, 
    entete: string, 
    parent: string, 
    children: string, 
    etiquette1: string, 
    etiquette2: string, 
    miniature: string}[] = [];

  onglet1: string;
  onglet2: string;
  onglet3: string;
  onglet4: string;

  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }


  getAllCategories(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe( (results) => {
      this.allcategories = results;
    });
  }

  fileProgressEntete(fileInput: any){
    this.enteteFileData = <File>fileInput.target.files[0];
  }

  validateTinymce1(content: string){
    console.log(content);
    if(content.length > 100) {
      this.formulaire.controls['onglet1'].setErrors({ 'invalid': true });
    }
  }

  validateTinymce2(content: string){
    console.log(content);
    if(content.length > 100) {
      this.formulaire.controls['onglet2'].setErrors({ 'invalid': true });
    }
  }

  validateTinymce3(content: string){
    console.log(content);
    if(content.length > 100) {
      this.formulaire.controls['onglet3'].setErrors({ 'invalid': true });
    }
  }

  validateTinymce4(content: string){
    console.log(content);
    if(content.length > 100) {
      this.formulaire.controls['onglet4'].setErrors({ 'invalid': true });
    }
  }


  createProduct(form: NgForm){
    console.log(form);

    if (this.enteteFileData === null) {
      alert("Veuillez charger une image!");
      return;
    }

    let formData: FormData = new FormData();

  formData.append("titre", this.formulaire.value.titre);
  formData.append("categorieParente", this.formulaire.value.categorieParente);
  formData.append("entete", this.enteteFileData);

  //if(this.onglet1.length > 10) alert("Sup à 10 car");
  formData.append("onglet1", this.onglet1);
  formData.append("onglet2", this.onglet2);
  formData.append("onglet3", this.onglet3);
  formData.append("onglet4", this.onglet4);
  
  formData.append("state", "active");

  this.dataStorageService.createProduct(formData).subscribe((result) => {
    console.log(result);
    if(result != "exists"){
      alert("Produit créé avec succès!");
      location.reload();
    }
    else{
      alert("Ce produit éxiste déja!");
    }
  });

  }


}
