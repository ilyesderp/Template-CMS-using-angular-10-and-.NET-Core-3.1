import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-modifier-produit-list',
  templateUrl: './modifier-produit-list.component.html',
  styleUrls: ['./modifier-produit-list.component.css']
})
export class ModifierProduitListComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'etiquette1', 'etiquette2', 'parent'];
  dataSource: MatTableDataSource<{
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
}>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;


  produits: {
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
}[] = [];

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
};

  isSelected: boolean = false;
  rowIndex: any;


  constructor(private dataStorageService: DataSotrageService, private router: Router) { }

  ngOnInit(): void {
    
    this.getAllProductsForList();
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
    
    this.selectedProduct = row;
  }



  getAllProductsForList(){
    this.dataStorageService.getallProductsFromServer().subscribe((results) => {
      this.produits = results;
      this.dataSource = new MatTableDataSource(this.produits);
      this.dataSource.paginator = this.paginator;
      //redefine filtering, to filter using only wanted columns, à tester encore:
      this.dataSource.filterPredicate = (data: {titre: string, etiquette1: string, etiquette2: string, categorie: string}, filter: string) => {
        return data.titre.startsWith(filter, 0) || data.etiquette1.startsWith(filter, 0) || data.etiquette2.startsWith(filter, 0) || data.categorie.startsWith(filter, 0);
       };
      this.dataSource.sort = this.sort;
    });
  }


  sendSelectedProduct(){
    //this.dataSharingService.sendCategory(data);

    this.router.navigate(["/admin-panel", "modifier-produits-et-services", "modifier-produit"], {queryParams: {id: this.selectedProduct.id}});
  }


}
