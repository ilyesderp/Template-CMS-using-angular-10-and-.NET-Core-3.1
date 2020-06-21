import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faSignInAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from '../shared/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  
  signInIcon = faSignInAlt;
  phoneIcon = faPhoneAlt;

  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {}

}
