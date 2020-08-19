import { Component, OnInit } from '@angular/core';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {


  productFromRoute: {titre: string, etiq1: string, etiq2: string}
  produit: {
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
  } = {
    id: '',
    titre: '',
    entete: '',
    miniature: '',
    categorie: '',
    onglet1: '',
    onglet2: '',
    onglet3: '',
    onglet4: '',
    etiquette1: '',
    etiquette2: '',
    state: ''
  };


  constructor(private dataStorageService: DataSotrageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    this.route.queryParams.subscribe((params: Params) => {
      this.productFromRoute = {
        titre: params["titre"],
        etiq1: params["etiq1"],
        etiq2: params["etiq2"]
      }

    });
    this.dataStorageService.getOneProductFromServer(this.productFromRoute.titre, this.productFromRoute.etiq1, this.productFromRoute.etiq2)
    .subscribe( result => {
      console.log(result);
      this.produit = result;
    });
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

}
