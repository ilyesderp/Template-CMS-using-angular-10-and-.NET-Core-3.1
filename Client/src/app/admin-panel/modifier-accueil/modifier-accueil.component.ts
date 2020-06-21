import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modifier-accueil',
  templateUrl: './modifier-accueil.component.html',
  styleUrls: ['./modifier-accueil.component.css']
})
export class ModifierAccueilComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.navigateTo();
  }

  navigateTo(){
    this.router.navigate(['modifier-slider'], {relativeTo: this.route, skipLocationChange: true});
  }

}
