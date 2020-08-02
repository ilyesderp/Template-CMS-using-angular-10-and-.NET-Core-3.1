import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../shared/side-nav.service';
import { HeaderService } from 'src/app/shared/navbar.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  //showFiller = false;
  toggleActive:boolean = false;

  constructor(private sidenav: SidenavService, public headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.hide();
  }


  

	toggleRightSidenav() {
		this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();
	}

}
