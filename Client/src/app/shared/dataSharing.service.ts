import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class DataService {

  private categorySource = new BehaviorSubject({
    id: '',
    titre: '',
    entete: '',
    parent: '',
    children: '',
    etiquette1: '',
    etiquette2: '',
    miniature: '',
    produits: '' });
  currentCategory = this.categorySource.asObservable();

  constructor() { }

  sendCategory(data: {
    id: any,
    titre: string,
    entete: string,
    parent: string,
    children: string,
    etiquette1: string,
    etiquette2: string,
    miniature: string,
    produits: string }) 
    {
    this.categorySource.next(data);
    }

}