import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../shared/navbar.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {
    //this.headerService.hide();
  }

}
