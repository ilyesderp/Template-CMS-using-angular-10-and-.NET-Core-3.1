import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataSotrageService } from '../shared/data-storage.service';
import { faLink } from '@fortawesome/free-solid-svg-icons';



declare var $: any;


@Component({
  selector: 'app-produits-et-services',
  templateUrl: './produits-et-services.component.html',
  styleUrls: ['./produits-et-services.component.css']
})
export class ProduitsEtServicesComponent implements OnInit, AfterViewInit {

  allCategories: {id: any, titre: string, 
    entete: string, 
    parent: string, 
    children: string, 
    etiquette1: string, 
    etiquette2: string, 
    miniature: string,
    produits: string}[] = [];

  tabIndex = 0;
  tabIndex2 = 0;

  filtre1: string = "Classique";
  filtre2: string = "Particulier";

  fliterClicked: boolean = false;

  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    
    this.getCategories();
  }

  ngAfterViewInit(){
    this.startPortfolioFilter();
  }

  getCategories(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe((result) => {
      this.allCategories = result;
    });
  }

  /*getChildren(){
    this.dataStorageService.getallChildrenFromServer().subscribe((result) => {
      this.allChildren = result;
    });
  }*/


  setChildren(children: string): string[]{
    let childrenArray: string[] = children.split(';');
    return childrenArray;
  }

  setChildLink(child: string, etiq1: string, etiq2: string){
    let link = "http://localhost:4200/produits-et-services/" + etiq1 + "/" + etiq2 + "/" + child;
    //link = "éèà réràr rré";
    link = link.replace(/[éè]/g,'e');
    link = link.replace(/[à]/g,'a');
    link = link.replace(/[ ]/g,'-');
    return link;
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

  formatImagePath(serverPath: string){
    let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2; 
  }



// for filter etiquettes1 buttons select design:
onTabClick(index){
    this.tabIndex = index;
}

// for filter etiquettes2 buttons select 2 design:
onTabClick2(index){
  this.tabIndex2 = index;
}

}
