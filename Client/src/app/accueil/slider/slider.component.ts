import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/shared/dynamic-script-loader.service';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Slides } from '../modifier-slider/slides.interface';
import { SlidesService } from '../modifier-slider/slides.service';







declare var $: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class SliderComponent implements OnInit, AfterViewInit{

  arrowRightSlider = faChevronRight;// not used yet, may delete later
  arrowLeftSlider = faChevronLeft; // net used yet, may delete later
  
  slide1: string = '../../../assets/images/img/agb-4.jpg';
  slide2: string;
  slide3: string;
  slide4: string;
  slide5: string;

  constructor(private dynamicScriptsLoader: DynamicScriptLoaderService, private slidesService: SlidesService) { } //Ce service DynamicScriptLoaderService n'est pas utilisé pour le moment
  
  
  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    //this.loadScripts();
    this.getSelectedSlide();
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




  getSelectedSlide(){
  
    this.slidesService.subjectSldierImage.subscribe(
        (slides: Slides) => {
          console.log("dna sslider component:");
          this.slide1 = slides.slide1;
          console.log("slide1 = "+slides.slide1);
          this.slide2 = slides.slide2;
          this.slide3 = slides.slide3;
          this.slide4 = slides.slide4;
  
    });
  }


  /*loadScripts(){
    this.dynamicScriptsLoader.load("pluginsJquery", "scriptsJquery", "includeJquery", "revolutionJquery", "toolsJquery", "sliderJquery", "imagesLoadedJquery", "scrollrevealJquery", "venoboxJquery", "isotopeJquery", "mainJquery").then(data => {
      console.log("script loaded successfuly!");
    }).catch(error => console.log(error));

  }*/

}

/*"node_modules/jquery/dist/jquery.min.js",
              "node_modules/bootstrap/dist/js/bootstrap.min.js", these are declarations in angular.json in scripts
               this is in style*/
