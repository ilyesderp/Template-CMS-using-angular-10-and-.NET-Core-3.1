import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

declare var $: any;

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit, AfterViewInit {

  categoryFromRoute: {titre: string, etiq1: string, etiq2: string};
  allCategories: {
    id: any,
    titre: string,
    entete: string,
    parent: string,
    children: string,
    etiquette1: string,
    etiquette2: string,
    miniature: string,
    produits: string
}[] = [];

  sousCategories: {
    id: any,
    titre: string,
    entete: string,
    parent: string,
    children: string,
    etiquette1: string,
    etiquette2: string,
    miniature: string,
    produits: string
  }[] = [];

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

productsUsed: {
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

tabIndex = 0;
tabIndex2 = 0;

filtre1: string = "Classique";
filtre2: string = "Particulier";

  constructor(private route: ActivatedRoute, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getCategorieFromRoute();
    this.getSousCategories();
    this.getProduits();
  }

  ngAfterViewInit(){
    this.startPortfolioFilter();
  }


  getCategorieFromRoute(){

    this.route.params.subscribe((params: Params) => {
      this.categoryFromRoute = {
        titre: params["titre"],
        etiq1: params["etiq1"],
        etiq2: params["etiq2"]
      }

    });
  }

  getSousCategories(){

    this.dataStorageService.getAllCategoriesFromServer().subscribe( data => {

      this.allCategories = data;
    

    if(this.allCategories.length > 0)
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
            //this.productsUsed = [];
        }
      }
    });
  }

  getProduits(){

    this.dataStorageService.getallProductsFromServer().subscribe( data => {

      this.allProducts = data;

      console.log("sous categories var:");
      console.log(this.productsUsed);

    if(this.allProducts.length > 0){
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

        

        if(product.categorie == this.currentCategory.titre && etiq1 == this.categoryFromRoute.etiq1 && etiq2 == this.categoryFromRoute.etiq2){
          this.productsUsed.push(product);
        }
      }
    }
      
    });
  }


  startPortfolioFilter(){
    $(document).ready(function(){
    
      /*$(".filter-button").click(function(){
          this.filtre1 = $(this).attr('data-filter');
          
            $('.filterNg').not('.'+this.filtre1).hide('3000');
            $('.filterNg').filter('.'+this.filtre1).show('3000');
    
            this.fliterClicked = true;
      });

      //start of 2nd filter:
      $(".filter-button2").click(function(){
        this.filtre2 = $(this).attr('id');

        console.log('.'+this.filtre2+'.'+this.filtre1);
        
        $('.filterNg').not('.'+this.filtre2+'.'+this.filtre1).hide('3000');
        $('.filterNg').filter('.'+this.filtre2+'.'+this.filtre1).show('3000');*/

        //this filter is temporary, need to change it to angular filter or better jquery filter.
        $(".filter-button, .filter-button2").click(function(){
          this.filtre1 = $(this).attr('data-filter');
          
            $('.filterNg').not('.'+this.filtre1).hide('3000');
            $('.filterNg').filter('.'+this.filtre1).show('3000');
    
            this.fliterClicked = true;
      
        
        
    });
            
  });
  }


  // for filter etiquettes1 buttons select design:
onTabClick(index){
  this.tabIndex = index;
}

// for filter etiquettes2 buttons select 2 design:
onTabClick2(index){
this.tabIndex2 = index;
}

formatImagePath(serverPath: string){
  let path2 = serverPath.replace(/\\/g, "/");
return 'https://localhost:44324/' + path2; 
}

setPath(link: string){
  //link = "éèà réràr rré";
  link = link.replace(/[éè]/g,'e');
  link = link.replace(/[à]/g,'a');
  link = link.replace(/[ ]/g,'-');
  link = link.toLowerCase();
  return link;
}


setChildren(children: string): string[]{
  let childrenArray: string[] = [];
  childrenArray = children.split(';');
  return childrenArray;
}


}
