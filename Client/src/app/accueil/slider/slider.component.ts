import { Component, OnInit, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DataSotrageService } from 'src/app/shared/data-storage.service';
import KeenSlider from "keen-slider";
import { Observable } from 'rxjs';
import { ResizeService } from 'src/app/shared/size-detector/resize.service';
import { SCREEN_SIZE } from 'src/app/shared/size-detector/screen-size.enum';
import { delay } from 'rxjs/operators';

export interface ImageText{
  id: number;
  imageTextPath: string;
  slideName: string;
  positionX: number;
  positionY: number;
}

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
  
  slide1: any;
  slide2: any;
  slide3: any;
  slide4: any;
  slide5: any;

  imgTxt1: ImageText;
  imgTxt2: ImageText;
  imgTxt3: ImageText;
  imgTxt4: ImageText;
  imgTxt5: ImageText;

  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>;
  
  images: String[];
  imgTexts: ImageText[];

  imgTxtObs: Observable<ImageText[]>;

  size: SCREEN_SIZE;


  constructor(private dataStorageService: DataSotrageService, private resizeService: ResizeService) { 
    this.resizeService.onResize$.pipe(delay(0)).subscribe(x => {
      this.size = x;
    });
  }
  
  


  ngOnInit(): void {
    this.getSlides();
    this.getImagesTexts();
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
              this.slide1 = elt;
              break;
            case "Slide2":
              this.slide2 = elt;
              break;
            case "Slide3":
              this.slide3 = elt;
              break;
            case "Slide4":
              this.slide4 = elt;
              break;
            case "Slide5":
              this.slide5 = elt;
              break;
          
            default: console.log("Erreur dans le SlideNumber");
              break;
          }
  
        }
        this.images = [
          this.slide1.path,
          this.slide2.path,
          this.slide3.path,
          this.slide4.path,
          this.slide5.path,
        ]; 
      }
      else{
        console.log("Aucune donnée n'est encore disponible pour le moment");
      }
      
      
    });
  }


  getImagesTexts(){
    this.imgTxtObs = this.dataStorageService.getTextImagesFromServer();

    /*this.dataStorageService.getTextImagesFromServer().subscribe( (results) => {
      console.log(results);
      
      for (let res of results) {

        console.log(res.imageTextPath);
        console.log(res.slideName);

        if(res != null){
          switch (res.slideName) {
            case "Slide1":
              this.imgTxt1.imageTextPath = res.imageTextPath;
              this.imgTxt1.slideName = res.slideName;
              break;
  
            case "Slide2":
              this.imgTxt2.imageTextPath = res.imageTextPath;
              this.imgTxt2.slideName = res.slideName;
              break;
  
            case "Slide3":
              this.imgTxt3.imageTextPath = res.imageTextPath;
              this.imgTxt3.slideName = res.slideNumber;
              break;
  
            case "Slide4":
              this.imgTxt4.imageTextPath = res.imageTextPath;
              this.imgTxt4.slideName = res.slideNumber;
              break;
  
            case "Slide5":
              this.imgTxt5.imageTextPath = res.imageTextPath;
              this.imgTxt5.slideName = res.slideNumber;
              break;
          }
        }       
      }

    });*/
  }


  ImagePath(serverPath: string){
    let path2 = serverPath.replace(/\\/g, "/");
    return 'https://localhost:44324/' + path2;
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy();
  }

}

