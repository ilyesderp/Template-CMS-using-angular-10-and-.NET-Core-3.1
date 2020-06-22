import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import KeenSlider from "keen-slider";



declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy{

  arrowRightSlider = faChevronRight;// not used yet, may delete later
  arrowLeftSlider = faChevronLeft; // not used yet, may delete later
  
  
  //declarations pour le slider
  slider: KeenSlider = null;
  opacities: number[] = [];
  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  
  slide1: string;
  slide2: string;
  slide3: string;
  slide4: string;
  slide5: string;

  imageTexts: string[];

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;
  
  images: String[];

  

  constructor(private dataStorageService: DataSotrageService) { }
  
  
  ngOnInit(): void {
    this.getSlides();
  }
  
  ngAfterViewInit(){ 
    this.startSlider();
    
  }
  

  startSlider () {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        slides: 5,
        loop: true,
        duration: 1500,
        slideChanged: s => {
          this.currentSlide = s.details().relativeSlide;
        },
        move: s => {
          this.opacities = s.details().positions.map(slide => slide.portion);
        }
      });
      this.dotHelper = [...Array(this.slider.details().size).keys()];
    });
  }




  getSlides(){
  
    this.dataStorageService.getSlidesFromServer().subscribe( donnee => {
      console.log(donnee);
      if(donnee != null){
        for (const elt of donnee) {
          switch (elt.slideNumber) {
            case "Slide1":
              this.slide1 = elt.path;
              break;
            case "Slide2":
              this.slide2 = elt.path;
              break;
            case "Slide3":
              this.slide3 = elt.path;
              break;
            case "Slide4":
              this.slide4 = elt.path;
              break;
            case "Slide5":
              this.slide5 = elt.path;
              break;
          
            default: console.log("Erreur dans le SlideNumber");
              break;
          }
  
        }
        this.images = [
          this.slide1,
          this.slide2,
          this.slide3,
          this.slide4,
          this.slide5
        ]; 
      }
      else{
        console.log("Aucune donnée n'est encore disponible pour le moment");
      }
      
      
    });
  }


  getImagesTexts(){
    this.dataStorageService.getTextImagesFromServer().subscribe( (result) => {
      //this.imageTexts = result;
    });
  }


  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

}

