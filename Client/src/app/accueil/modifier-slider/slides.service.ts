import { Subject } from 'rxjs';
import { Slides } from './slides.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SlidesService{

    subjectSldierImage = new Subject<Slides>();

    getSlides(slides: Slides){
        this.subjectSldierImage.next(slides);
    }
    
}