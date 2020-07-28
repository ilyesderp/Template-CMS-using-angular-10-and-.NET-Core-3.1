import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from '../shared/navbar.service';
import { DataSotrageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  
  signInIcon = faSignInAlt;
  phoneIcon = faPhoneAlt;

  selectedCountryCode = 'us';
  countryCodes = ['us', 'lu', 'de', 'bs', 'br', 'pt', 'dz'];

  constructor(public headerService: HeaderService, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getTauxChange();
  }


  changeSelectedCountryCode(value: string): void {
    this.selectedCountryCode = value;
  }


getTauxChange(){
  this.dataStorageService.getTauxChangeJson().subscribe( (data: any) => {
      console.log("-----------------------------------");
      console.log(data.body.result);
      console.log("-----------------------------------");
  });
}

}
