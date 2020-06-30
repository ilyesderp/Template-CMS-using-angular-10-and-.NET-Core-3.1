import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-popup-accueil',
  templateUrl: './modifier-popup-accueil.component.html',
  styleUrls: ['./modifier-popup-accueil.component.css']
})
export class ModifierPopupAccueilComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.navigateTo();
  }

  navigateTo(){
    this.router.navigate(['modifier-popup-yt-video'], {relativeTo: this.route, skipLocationChange: true});
  }

}
