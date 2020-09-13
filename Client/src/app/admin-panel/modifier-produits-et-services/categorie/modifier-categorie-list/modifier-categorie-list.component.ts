import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-categorie-list',
  templateUrl: './modifier-categorie-list.component.html',
  styleUrls: ['./modifier-categorie-list.component.css']
})
export class ModifierCategorieListComponent implements OnInit {

  categories: {
    id: any;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;
}[] = [];


  constructor(private dataStorageService: DataSotrageService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategoriesForList();
  }


  getAllCategoriesForList(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe((results) => {
      this.categories = results;
    });
  }


  sendSelectedCategory(data: {
    id: any;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;  
}){
    //this.dataSharingService.sendCategory(data);

    this.router.navigate(["/admin-panel", "modifier-produits-et-services", "modifier-categorie"], {queryParams: {id: data.id}});
  }

}
