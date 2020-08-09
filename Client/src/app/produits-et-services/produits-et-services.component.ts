import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-produits-et-services',
  templateUrl: './produits-et-services.component.html',
  styleUrls: ['./produits-et-services.component.css']
})
export class ProduitsEtServicesComponent implements OnInit {

  allCategories: any[] = [];

  constructor(private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
  }

  getCategories(){
    this.dataStorageService.getAllCategoriesFromServer().subscribe((result) => {
      this.allCategories = result;
    });
  }

}
