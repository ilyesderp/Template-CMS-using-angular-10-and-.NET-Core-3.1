import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categoryFromRoute: {titre: string, etiq1: string, etiq2: string};
  allCategories: {
    id: any;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;
}[];

  sousCategories: {
    id: any;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;
  }[];

  allProducts: {
    id: any;
    titre: string;
    entete: string;
    categorie: string;
    onglet1: string;
    onglet2: string;
    onglet3: string;
    onglet4: string;
    etiquette1: string;
    etiquette2: string;
    state: string;
}[];

currentCategory: {
  id: any;
  titre: string;
  entete: string;
  parent: string;
  children: string;
  etiquette1: string;
  etiquette2: string;
  miniature: string;
  produits: string;
};

  constructor(private route: ActivatedRoute, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getCategorieFromRoute();
    this.getSousCategories();
    this.getProduits();
  }


  getCategorieFromRoute(){

    this.route.params.subscribe((params: Params) => {
      this.categoryFromRoute = {
        titre: params["titre"],
        etiq1: params["etiq1"],
        etiq2: params["etiq2"]
      }

      console.log(this.categoryFromRoute);
    });
  }

  getSousCategories(){

    this.dataStorageService.getAllCategoriesFromServer().subscribe( data => {

      this.allCategories = data;

    

    if(this.allCategories != null)
      for (let cat of this.allCategories) {
        
        let parent = cat.parent;
        parent = parent.replace(/[éè]/g,'e');
        parent = parent.replace(/[à]/g,'a');
        parent = parent.replace(/[ ]/g,'-');
        parent = parent.toLowerCase();

        let etiq1 = cat.etiquette1;
        etiq1 = etiq1.replace(/[éè]/g,'e');
        etiq1 = etiq1.replace(/[à]/g,'a');
        etiq1 = etiq1.replace(/[ ]/g,'-');
        etiq1 = etiq1.toLowerCase();

        let etiq2 = cat.etiquette2;
        etiq2 = etiq2.replace(/[éè]/g,'e');
        etiq2 = etiq2.replace(/[à]/g,'a');
        etiq2 = etiq2.replace(/[ ]/g,'-');
        etiq2 = etiq2.toLowerCase();

        
        // this is to get current category:
        if(parent == this.categoryFromRoute.titre && 
          etiq1 == this.categoryFromRoute.etiq1 && 
          etiq2 == this.categoryFromRoute.etiq2){
          this.sousCategories.push(cat);
        }

        let current = cat.titre.replace(/[éè]/g,'e');
        current = current.replace(/[à]/g,'a');
        current = current.replace(/[ ]/g,'-');
        current = current.toLowerCase();

        if(current == this.categoryFromRoute.titre && 
          etiq1 == this.categoryFromRoute.etiq1 && 
          etiq2 == this.categoryFromRoute.etiq2){
            this.currentCategory = cat;
        }
      }
    });
  }

  getProduits(){

    this.dataStorageService.getallProductsFromServer().subscribe( data => {

      this.allProducts = data;

    if(this.allProducts != null)
      for (let product of this.allProducts) {
        
        let parent = product.categorie;
        parent = parent.replace(/[éè]/g,'e');
        parent = parent.replace(/[à]/g,'a');
        parent = parent.replace(/[ ]/g,'-');
        parent = parent.toLowerCase();

        let etiq1 = product.etiquette1;
        etiq1 = etiq1.replace(/[éè]/g,'e');
        etiq1 = etiq1.replace(/[à]/g,'a');
        etiq1 = etiq1.replace(/[ ]/g,'-');
        etiq1 = etiq1.toLowerCase();

        let etiq2 = product.etiquette2;
        etiq2 = etiq2.replace(/[éè]/g,'e');
        etiq2 = etiq2.replace(/[à]/g,'a');
        etiq2 = etiq2.replace(/[ ]/g,'-');
        etiq2 = etiq2.toLowerCase();

        

        if(parent == this.categoryFromRoute.titre && etiq1 == this.categoryFromRoute.etiq1 && etiq2 == this.categoryFromRoute.etiq2){
          this.allProducts.push(product);
        }
      }
    });
  }

}
