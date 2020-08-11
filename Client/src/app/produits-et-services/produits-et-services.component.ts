import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from '../shared/data-storage.service';



declare var $: any;


@Component({
  selector: 'app-produits-et-services',
  templateUrl: './produits-et-services.component.html',
  styleUrls: ['./produits-et-services.component.css']
})
export class ProduitsEtServicesComponent implements OnInit {

  allCategories: {id: any, titre: string, 
    entete: string, 
    parent: string, 
    children: string, 
    etiquette1: string, 
    etiquette2: string, 
    miniature: string}[] = [];
  allProducts: any[] = [];

  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.startPortfolioFilter();
    this.getCategories();
  }

  getCategories(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe((result) => {
      this.allCategories = result;
    });
  }

  getProducts(){
    this.dataStorageService.getAllProductsFromServer().subscribe((result) => {
      this.allProducts = result;
    });
  }

  startPortfolioFilter(){
    $(document).ready(function(){
    
      $(".filter-button").click(function(){
          var value = $(this).attr('data-filter');
          
          if(value == "all")
          {
              //$('.filter').removeClass('hidden');
              $('.filter').show('1000');
          }
          else
          {
  //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
  //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
              $(".filter").not('.'+value).hide('3000');
              $('.filter').filter('.'+value).show('3000');
              
          }
      });
      
      if ($(".filter-button").removeClass("active")) {
  $(this).removeClass("active");
  }
  $(this).addClass("active");
  
  });
  }

  formatImagePath(serverPath: string){
    let path2 = serverPath.replace(/\\/g, "/");
  return 'https://localhost:44324/' + path2; 
  }

}
