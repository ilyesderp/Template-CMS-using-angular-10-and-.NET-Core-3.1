import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faSignInAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { HeaderService } from '../shared/navbar.service';
import { DataSotrageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  signInIcon = faSignInAlt;
  phoneIcon = faPhoneAlt;

  selectedCountryCode1 = 'eu';
  selectedCountryCode2 = 'dz';
  //countryCodes = ['eu', 'us', 'jp', 'ch', 'se', 'dk', 'no', 'dz'];
  countryCodes = [];
  unit1: number;
  shortName1: string;
  sellRate1: number;
  specialCase: string = '';

  /*unit2: number;
  shortName2: string;
  sellRate2: number;*/

  taux: {unit: number, shortName: string, sellRate: number}[] = [];

  constructor(public headerService: HeaderService, private dataStorageService: DataSotrageService) { }
  

  ngOnInit(): void {
    this.getTauxChange();
    
  }


  ngAfterViewInit(): void {
    /*this.changeSelectedCountryCodeOne("eu");
    this.changeSelectedCountryCodeTwo("dz");*/
  }


  changeSelectedCountryCodeOne(value: string): void {
    this.selectedCountryCode1 = value;
    
    for (const elt of this.taux) {
      let code: string = elt.shortName.substring(0,2);
      code = code.toLowerCase();
      if((code == 'cn') && (elt.shortName == "CNY") && (code == this.selectedCountryCode1) && (this.specialCase == 'CNH' || this.specialCase == '')){
        this.unit1 = elt.unit;
        this.shortName1 = elt.shortName;
        this.sellRate1 = elt.sellRate;
        this.specialCase = 'CNY'
        break;
      }
      else if((code == 'cn') && (elt.shortName == "CNH") && (code == this.selectedCountryCode1) && (this.specialCase == 'CNY' || this.specialCase == '')){
        this.unit1 = elt.unit;
        this.shortName1 = elt.shortName;
        this.sellRate1 = elt.sellRate;
        this.specialCase = 'CNH'
        break;
      }
      else if(code == this.selectedCountryCode1 && elt.shortName != "CNY" && elt.shortName != "CNH"){
        this.unit1 = elt.unit;
        this.shortName1 = elt.shortName;
        this.sellRate1 = elt.sellRate;
        break;
      }

    }

  }

  
  changeSelectedCountryCodeTwo(value: string): void {
    this.selectedCountryCode2 = value;

    /*for (const elt of this.taux) {
      let code: string = elt.shortName.substring(0,2);
      code = code.toLowerCase();
      if(code == this.selectedCountryCode2){
        this.unit2 = elt.unit;
        this.shortName2 = elt.shortName;
        this.sellRate2 = elt.sellRate;
      }
      else{
        console.log("erreur countryCode");
      }
    }*/
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

        this.taux.push({unit: elt.unit, shortName: elt.shortName, sellRate: elt.sellRate});
        
      }
      this.changeSelectedCountryCodeOne("eu");
  });
}

}
