import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-modifier-categorie-list',
  templateUrl: './modifier-categorie-list.component.html',
  styleUrls: ['./modifier-categorie-list.component.css']
})
export class ModifierCategorieListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['titre', 'etiquette1', 'etiquette2', 'parent'];
  dataSource: MatTableDataSource<{
    id: any;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;
}>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


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

selectedCateg: {
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

  isSelected: boolean = false;
  rowIndex: any;


  constructor(private dataStorageService: DataSotrageService, private router: Router) { 
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.getAllCategoriesForList();
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getSelectedRow(row: any){

    this.isSelected = true;
    this.rowIndex = row.id;
    
    this.selectedCateg = row;
  }



  getAllCategoriesForList(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe((results) => {
      this.categories = results;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  sendSelectedCategory(){
    //this.dataSharingService.sendCategory(data);

    this.router.navigate(["/admin-panel", "modifier-produits-et-services", "modifier-categorie"], {queryParams: {id: this.selectedCateg.id}});
  }

}
