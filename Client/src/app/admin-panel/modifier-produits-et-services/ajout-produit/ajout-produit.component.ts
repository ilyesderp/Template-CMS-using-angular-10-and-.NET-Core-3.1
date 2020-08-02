import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  html = `
    <p>Test Tinymce</p>
    `;

  config: any = {
    height: 250,
    width: 950,
    plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern',
    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
    
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    language: "fr_FR",
    language_url : '/assets/tinymce/langs/fr_FR.js'
  };

  constructor() { }

  ngOnInit(): void {
  }

  createProduct(form: NgForm){
    console.log(form);
  }

}
