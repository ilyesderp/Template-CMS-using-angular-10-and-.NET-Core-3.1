import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({providedIn: 'root'})
export class DataSotrageService{

    
    constructor(private http: HttpClient){}
    
    
    
    postImagesToServer(formData: FormData){
        
        return this.http.post('https://localhost:44324/api/imageupload', formData, {
          reportProgress: true,
          observe: 'events',
          responseType: 'text'   
        });
    }

    getImagesFromServer(){
        return this.http.get<any[]>('https://localhost:44324/api/imageupload');
    }


    postSlide1ToServer(slidePath: string){
        console.log("this is slidePath arg in put req: " + slidePath);
        return this.http.put('https://localhost:44324/api/slides', { "IdSlideNumber": "Slide1", "Path": slidePath }, {responseType: 'text'});
    }
    postSlide2ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides/2', slidePath, {"responseType": 'text'});
    }
    postSlide3ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides/3', slidePath, {"responseType": 'text'});
    }
    postSlide4ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides/4', slidePath, {"responseType": 'text'});
    }
    postSlide5ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides/5', slidePath, {"responseType": 'text'});
    }

    getSlidesFromServer(){
        return this.http.get<any[]>('https://localhost:44324/api/slides');
    }


}