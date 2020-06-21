import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderService } from '../shared/navbar.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
})
export class AccueilComponent implements OnInit {

  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.show();
  }

  

}
