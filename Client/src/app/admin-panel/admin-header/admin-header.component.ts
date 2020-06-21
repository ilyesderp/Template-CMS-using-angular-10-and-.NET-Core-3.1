import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../shared/side-nav.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  //showFiller = false;
  toggleActive:boolean = false;

  constructor(private sidenav: SidenavService) { }

  ngOnInit(): void {
  }


  

	toggleRightSidenav() {
		this.toggleActive = !this.toggleActive;
		this.sidenav.toggle();
	}

}
