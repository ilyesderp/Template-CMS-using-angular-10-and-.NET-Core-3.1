import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';
import { DialogSuppCategorieComponent } from './dialog-supp-categorie/dialog-supp-categorie.component';




@Component({
  selector: 'app-suppression-categorie',
  templateUrl: './suppression-categorie.component.html',
  styleUrls: ['./suppression-categorie.component.css']
})
export class SuppressionCategorieComponent implements OnInit {
  displayedColumns: string[] = ['select', 'titre', 'etiquette1', 'etiquette2', 'parent'];

  selection = new SelectionModel<{
    id: any;
    titre: string;
    entete: string;
    parent: string;
    children: string;
    etiquette1: string;
    etiquette2: string;
    miniature: string;
    produits: string;
}>(true, []);

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

  toBeDeleted: string[] = []; 

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


  constructor(private dataStorageService: DataSotrageService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategoriesForList();
  }


  openDialog() {
    
    const dialogRef = this.dialog.open(DialogSuppCategorieComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true){
        this.deleteSelectedCategory();
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }





  getAllCategoriesForList(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe((results) => {
      this.categories = results;
      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  deleteSelectedCategory(){
    for (const delCat of this.selection.selected) {
      this.toBeDeleted.push(delCat.id);
    } 
    //besoin d'ajouter la vérif si la categ a des sous produits ou sous categ, si n'a pas on peut supprimer.(to be done in server)
    this.dataStorageService.deleteCategory(this.toBeDeleted).subscribe( result => {

      if(result == "has products"){
        alert("Catégorie ne peut pas etre supprimée car elle a des sous produits! Vous devez d'abord les supprimer.")
      }
      else{
        this.getAllCategoriesForList();
        this.toBeDeleted = [];
        this.selection = new SelectionModel<{
          id: any;
          titre: string;
          entete: string;
          parent: string;
          children: string;
          etiquette1: string;
          etiquette2: string;
          miniature: string;
          produits: string;
        }>(true, []);
        alert("Suppression réussie!");
      }
        
    });
    
    
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      if(this.dataSource != null){
        const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
      }
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: {
      id: any;
      titre: string;
      entete: string;
      parent: string;
      children: string;
      etiquette1: string;
      etiquette2: string;
      miniature: string;
      produits: string;
  }): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      //console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`);
      
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

}
