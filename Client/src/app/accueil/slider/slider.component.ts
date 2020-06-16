import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { DataSotrageService } from 'src/app/shared/data-storage.service';







declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class SliderComponent implements OnInit, AfterViewInit{

  arrowRightSlider = faChevronRight;// not used yet, may delete later
  arrowLeftSlider = faChevronLeft; // not used yet, may delete later
  
  slide1: string = '../../../assets/images/img/agb-4.jpg';
  slide2: string = '../../../assets/images/img/Professionels.jpg';
  slide3: string = '../../../assets/images/img/BackgroundParis.jpg';
  slide4: string = '../../../assets/images/img/EpargneSmart.jpg';
  slide5: string = '../../../assets/images/img/AGBPro.jpg';

  constructor(private dataStorageService: DataSotrageService) { }
  
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.getSlides();
    this.startSlider();
    
  }
  

  startSlider () {
    $(document).ready(function() {
    $('.tp-banner').show().revolution({ 
        dottedOverlay:"none",
        delay:6000,
        startwidth:1170,
        startheight:700,
        hideThumbs:"on",

        thumbWidth:100,
        thumbHeight:50,
        thumbAmount:5,

        navigationArrows:"solo",
        navigationStyle:"preview4",

        touchenabled:"on",
        onHoverStop:"on",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax:"mouse",
        parallaxBgFreeze:"on",
        parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

        keyboardNavigation:"off",

        navigationHAlign:"center",
        navigationVAlign:"bottom",
        navigationHOffset:0,
        navigationVOffset:20,

        soloArrowLeftHalign:"left",
        soloArrowLeftValign:"center",
        soloArrowLeftHOffset:20,
        soloArrowLeftVOffset:0,

        soloArrowRightHalign:"right",
        soloArrowRightValign:"center",
        soloArrowRightHOffset:20,
        soloArrowRightVOffset:0,

        shadow:0,
        fullWidth:"on",
        fullScreen:"off",

        spinner:"spinner4",

        stopLoop:"off",
        stopAfterLoops:-1,
        stopAtSlide:-1,

        shuffle:"off",

        autoHeight:"off",                       
        forceFullWidth:"off",                       

        hideThumbsOnMobile:"off",
        hideNavDelayOnMobile:1500,                      
        hideBulletsOnMobile:"off",
        hideArrowsOnMobile:"off",
        hideThumbsUnderResolution:0,

        hideSliderAtLimit:0,
        hideCaptionAtLimit:0,
        hideAllCaptionAtLilmit:0,
        startWithSlide:0,
        fullScreenOffsetContainer: ""
    });
});
  }




  getSlides(){
  
    this.dataStorageService.getSlidesFromServer().subscribe( donnee => {
      console.log(donnee);
      this.slide1 = donnee[0].path;
      this.slide2 = donnee[1].path;
      this.slide3 = donnee[2].path;
      this.slide4 = donnee[3].path;
      this.slide5 = donnee[4].path;
    });
  }


}

