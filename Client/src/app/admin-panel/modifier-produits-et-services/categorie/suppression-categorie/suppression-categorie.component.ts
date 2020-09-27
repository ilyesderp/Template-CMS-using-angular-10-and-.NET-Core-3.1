import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-suppression-categorie',
  templateUrl: './suppression-categorie.component.html',
  styleUrls: ['./suppression-categorie.component.css']
})
export class SuppressionCategorieComponent implements OnInit {
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

  constructor(private dataStorageService: DataSotrageService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategoriesForList();
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
    console.log(row);

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