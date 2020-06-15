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


    postSlideToServer(slide: string){
        return this.http.post('https://localhost:44324/api/slidescontroller', slide);
    }


}