import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import KeenSlider from "keen-slider";



declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy{

  arrowRightSlider = faChevronRight;// not used yet, may delete later
  arrowLeftSlider = faChevronLeft; // not used yet, may delete later
  
  
  //declarations pour le slider
  slider: KeenSlider = null;
  opacities: number[] = [];
  
  slide1: string = '../../../assets/images/img/agb-4.jpg';
  slide2: string = '../../../assets/images/img/Professionels.jpg';
  slide3: string = '../../../assets/images/img/BackgroundParis.jpg';
  slide4: string = '../../../assets/images/img/EpargneSmart.jpg';
  slide5: string = '../../../assets/images/img/AGBPro.jpg';

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;


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
        slides: 5,
        loop: true,
        duration: 1000,
        move: s => {
          this.opacities = s.details().positions.map(slide => slide.portion);
        }
      });
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
      }
      else{
        console.log("Aucune donnée n'est encore disponible pour le moment");
      }
      
      
    });
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

}

