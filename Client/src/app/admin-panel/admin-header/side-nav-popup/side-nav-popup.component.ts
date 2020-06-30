import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'src/app/shared/side-nav.service';

@Component({
  selector: 'app-side-nav-popup',
  templateUrl: './side-nav-popup.component.html',
  styleUrls: ['./side-nav-popup.component.css']
})
export class SideNavPopupComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {
  }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

}
