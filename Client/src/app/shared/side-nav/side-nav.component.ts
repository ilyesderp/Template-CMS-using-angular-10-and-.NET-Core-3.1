import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.ts.component.css']
})
export class SideNav implements OnInit, AfterViewInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {
  }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
  
}
