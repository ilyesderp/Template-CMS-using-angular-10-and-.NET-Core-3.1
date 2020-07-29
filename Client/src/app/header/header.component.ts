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

  selectedCountryCode1 = 'eu';
  selectedCountryCode2 = 'dz';
  //countryCodes = ['eu', 'us', 'jp', 'ch', 'se', 'dk', 'no', 'dz'];
  countryCodes = [];
  unit: number;
  shortName: string;
  sellRate: number;

  taux: {unit: number, shortName: string, sellRate: number}[] = [];

  constructor(public headerService: HeaderService, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
    this.getTauxChange();
  }


  changeSelectedCountryCodeOne(value: string): void {
    this.selectedCountryCode1 = value;
  }

  //not used yet
  changeSelectedCountryCodeTwo(value: string): void {
    this.selectedCountryCode2 = value;
  }


getTauxChange(){
  this.dataStorageService.getTauxChangeJson().subscribe( (data: any) => {
      console.log("-----------------------------------");
      console.log(data.body.result);
      console.log("-----------------------------------");

      for (const elt of data.body.result) {
        var countryCode: string = elt.shortName;
        countryCode = countryCode.substring(0,2);
        countryCode = countryCode.toLowerCase();
        this.countryCodes.push(countryCode);

        if(this.selectedCountryCode1 == countryCode){
          this.unit = elt.unit;
          this.shortName = elt.shortName;
          this.sellRate = elt.sellRate;
        }
        else{
          console.log("erreur countryCode");
        }

        //this.taux.push({unit: elt.unit, shortName: elt.shortName, sellRate: elt.sellRate});
        
      }
  });
}

}
