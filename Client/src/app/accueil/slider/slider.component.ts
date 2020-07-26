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
  device: string;
}


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit, OnDestroy{

  arrowRightSlider = faChevronRight;// not used yet, may delete later
  arrowLeftSlider = faChevronLeft; // not used yet, may delete later
  
  
  //declarations pour le slider
  sliderDesktop: KeenSlider = null;
  sliderTab: KeenSlider = null;
  sliderMobile: KeenSlider = null;

  opacitiesDesktop: number[] = [];
  opacitiesTab: number[] = [];
  opacitiesMobile: number[] = [];

  currentSlideDesktop: number = 1;
  currentSlideTab: number = 1;
  currentSlideMobile: number = 1;

  dotHelperDesktop: Array<Number> = [];
  dotHelperTab: Array<Number> = [];
  dotHelperMobile: Array<Number> = [];

  autoPlayDesktop: any;
  autoPlayTab: any;
  autoPlayMobile: any;
  
   //fin declarations pour le slider

  imgTxt1: ImageText;
  imgTxt2: ImageText;
  imgTxt3: ImageText;
  imgTxt4: ImageText;
  imgTxt5: ImageText;

  @ViewChild("sliderRefDesktop") sliderRefDesktop: ElementRef<HTMLElement>;
  @ViewChild("sliderRefTab") sliderRefTab: ElementRef<HTMLElement>;
  @ViewChild("sliderRefMobile") sliderRefMobile: ElementRef<HTMLElement>;
  
  imagesDesktop: {id: number, slide: string, img: string}[] = [];
  imagesTablette: {id: number, slide: string, img: string}[] = [];
  imagesMobile: {id: number, slide: string, img: string}[] = [];
  imgTexts: ImageText[];

  imgTxtObs: Observable<ImageText[]>;

  size: SCREEN_SIZE;


  constructor(private dataStorageService: DataSotrageService, private resizeService: ResizeService) { 
    this.resizeService.onResize$.pipe(delay(0)).subscribe(x => {
      this.size = x;

      if(this.size == 3){
        this.startSliderDesktop();
      }
      else if(this.size == 2 || this.size == 1){
        this.startSliderTab();
      }
      else if(this.size == 0){
        this.startSliderMobile();
      }
    });
  }
  
  


  ngOnInit(): void {
    this.getSlides();
    this.getImagesTexts();
  }
  
  ngAfterViewInit(){ 
    /*this.startSliderDesktop();
    this.startSliderTab();
    this.startSliderMobile();*/
    
  }
  

  startSliderDesktop () {
    setTimeout(() => {
      this.sliderDesktop = new KeenSlider(this.sliderRefDesktop.nativeElement, {
        initial: 0,
        slides: 5,
        loop: true,
        duration: 1500,
        slideChanged: s => {
          this.currentSlideDesktop = s.details().relativeSlide;
        },
        move: s => {
          this.opacitiesDesktop = s.details().positions.map(slide => slide.portion);
        }
      });
      this.dotHelperDesktop = [...Array(this.sliderDesktop.details().size).keys()];
      
      //autoplay à corriger:
      if(this.autoPlayTab){
        clearInterval(this.autoPlayTab);
      }
      if(this.autoPlayMobile){
        clearInterval(this.autoPlayMobile);
      }
      this.autoPlayDesktop = setInterval(() => this.sliderDesktop.next() , 4000);
    });
    
    
  }

  startSliderTab () {
    setTimeout(() => {
      this.sliderTab = new KeenSlider(this.sliderRefTab.nativeElement, {
        initial: 0,
        slides: 5,
        loop: true,
        duration: 1500,
        slideChanged: s => {
          this.currentSlideTab = s.details().relativeSlide;
        },
        move: s => {
          this.opacitiesTab = s.details().positions.map(slide => slide.portion);
        }
      });
      this.dotHelperTab = [...Array(this.sliderTab.details().size).keys()];

      //autoplay:
      if(this.autoPlayDesktop){
        clearInterval(this.autoPlayDesktop);
      }
      if(this.autoPlayMobile){
        clearInterval(this.autoPlayMobile);
      }
      this.autoPlayTab = setInterval(() => this.sliderTab.next(), 4000);
    });
  }

  startSliderMobile () {
    setTimeout(() => {
      this.sliderMobile = new KeenSlider(this.sliderRefMobile.nativeElement, {
        initial: 0,
        slides: 5,
        loop: true,
        duration: 1500,
        slideChanged: s => {
          this.currentSlideMobile = s.details().relativeSlide;
        },
        move: s => {
          this.opacitiesMobile = s.details().positions.map(slide => slide.portion);
        }
      });
      this.dotHelperMobile = [...Array(this.sliderMobile.details().size).keys()];

      //autoplay:
      if(this.autoPlayDesktop){
        clearInterval(this.autoPlayDesktop);
      }
      if(this.autoPlayTab){
        clearInterval(this.autoPlayTab);
      }
      this.autoPlayMobile = setInterval(() => this.sliderMobile.next(), 4000);
    });
  }




  getSlides(){
  
    this.dataStorageService.getSlidesFromServer().subscribe( donnee => {
      console.log(donnee);
      if(donnee != null){
        for (const elt of donnee) {
          if(elt.device == "desktop")
          {
            switch (elt.slideNumber) {
              case "Slide1":
                this.imagesDesktop.push({id: 0, slide: "Slide1", img: elt.path});
                break;
              case "Slide2":
                this.imagesDesktop.push({id: 1, slide: "Slide2", img: elt.path});
                break;
              case "Slide3":
                this.imagesDesktop.push({id: 2, slide: "Slide3", img: elt.path});
                break;
              case "Slide4":
                this.imagesDesktop.push({id: 3, slide: "Slide4", img: elt.path});
                break;
              case "Slide5":
                this.imagesDesktop.push({id: 4, slide: "Slide5", img: elt.path});
                break;
            
              default: console.log("Erreur dans le SlideNumber");
                break;
            }
          }
          else if(elt.device == "tablette"){
            switch (elt.slideNumber) {
              case "Slide1":
                this.imagesTablette.push({id: 0, slide: "Slide1", img: elt.path});
                break;
              case "Slide2":
                this.imagesTablette.push({id: 1, slide: "Slide2", img: elt.path});
                break;
              case "Slide3":
                this.imagesTablette.push({id: 2, slide: "Slide3", img: elt.path});
                break;
              case "Slide4":
                this.imagesTablette.push({id: 3, slide: "Slide4", img: elt.path});
                break;
              case "Slide5":
                this.imagesTablette.push({id: 4, slide: "Slide5", img: elt.path});
                break;
            
              default: console.log("Erreur dans le SlideNumber");
                break;
            }
          }
          else if(elt.device == "mobile"){
            switch (elt.slideNumber) {
              case "Slide1":
                this.imagesMobile.push({id: 0, slide: "Slide1", img: elt.path});
                break;
              case "Slide2":
                this.imagesMobile.push({id: 1, slide: "Slide2", img: elt.path});
                break;
              case "Slide3":
                this.imagesMobile.push({id: 2, slide: "Slide3", img: elt.path});
                break;
              case "Slide4":
                this.imagesMobile.push({id: 3, slide: "Slide4", img: elt.path});
                break;
              case "Slide5":
                this.imagesMobile.push({id: 4, slide: "Slide5", img: elt.path});
                break;
            
              default: console.log("Erreur dans le SlideNumber");
                break;
            }
          }
  
        } 
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

  //this method is used in *ngfor
  identify(index, elt){
    return elt.id;
  }


  ngOnDestroy() {
    if (this.sliderDesktop) this.sliderDesktop.destroy();
    if (this.sliderTab) this.sliderTab.destroy();
    if (this.sliderMobile) this.sliderMobile.destroy();
  }

}

