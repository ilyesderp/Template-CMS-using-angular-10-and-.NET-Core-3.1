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
  slide5: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private slidesService: SlidesService) { }

  ngOnInit(): void {
  }

  sendSlides(){
    const slides: Slides = {slide1: this.slide1, slide2: this.slide2, slide3: this.slide3, slide4: this.slide4, slide5: this.slide5};
    this.slidesService.send(slides);
  }

  attributionSlide1(data: string){
    this.slide1 = data;
    console.log(data);
    this.sendSlides();
    alert("L'image selectinnée a été insérée dans le slide 1 !");
  }
  attributionSlide2(data: string){
    this.slide2 = data;
    this.sendSlides();
    alert("L'image selectinnée a été insérée dans le slide 2 !");
  }
  attributionSlide3(data: string){
    this.slide3 = data;
    this.sendSlides();
    alert("L'image selectinnée a été insérée dans le slide 3 !");
  }
  attributionSlide4(data: string){
    this.slide4 = data;
    this.sendSlides();
    alert("L'image selectinnée a été insérée dans le slide 4 !");
  }
  attributionSlide5(data: string){
    this.slide5 = data;
    this.sendSlides();
    alert("L'image selectinnée a été insérée dans le slide 5 !");
  }

}
