import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from 'src/app/shared/side-nav.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav-produits',
  templateUrl: './side-nav-produits.component.html',
  styleUrls: ['./side-nav-produits.component.css']
})
export class SideNavProduitsComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
