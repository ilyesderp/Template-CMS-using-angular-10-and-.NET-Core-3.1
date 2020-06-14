import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SlidesService } from '../slides.service';
import { Slides } from '../slides.interface';

@Component({
  selector: 'app-popup-elements',
  templateUrl: './popup-elements.component.html',
  styleUrls: ['./popup-elements.component.css']
})
export class PopupElementsComponent implements OnInit {
  slide1: string;
  slide2: string;
  slide3: string;
  slide4: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private slidesService: SlidesService) { }

  ngOnInit(): void {
  }

  sendSlides(){
    const slides: Slides = {slide1: this.slide1, slide2: this.slide2, slide3: this.slide3, slide4: this.slide4};
    this.slidesService.getSlides(slides);
  }

}
