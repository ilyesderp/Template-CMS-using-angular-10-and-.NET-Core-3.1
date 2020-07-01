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
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide1", "Path": slidePath }, {responseType: 'text'});
    }
    postSlide2ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide2", "Path": slidePath }, {responseType: 'text'});
    }
    postSlide3ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide3", "Path": slidePath }, {responseType: 'text'});
    }
    postSlide4ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide4", "Path": slidePath }, {responseType: 'text'});
    }
    postSlide5ToServer(slidePath: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide5", "Path": slidePath }, {responseType: 'text'});
    }


    //get accueil slides from db:
    getSlidesFromServer(){
        return this.http.get<any[]>('https://localhost:44324/api/slides');
    }

    deleteImageInService(id: any){
        console.log("id = "+ id);
        return this.http.delete(`https://localhost:44324/api/imageupload/${id}`, {responseType: 'text'});
    }


    postTextImagesToServer(formData: FormData){

        console.log("content of formData");
        console.log(formData);

        return this.http.post("https://localhost:44324/api/ImageText", formData, {
            reportProgress: true,
            observe: 'events',
            responseType: 'text'   
          });
    }


    getTextImagesFromServer(){
        return this.http.get<any[]>("https://localhost:44324/api/ImageText");
    }

    deleteTextImageFromServer(id){
        return this.http.delete(`https://localhost:44324/api/ImageText/${id}`, {responseType: 'text'});
    }

    updatePosition(position: {Image: any, PosX: any, PosY: any, NumSlide: string}){
        return this.http.put("https://localhost:44324/api/ImageText" , position, {responseType: 'text'});
    }


    postYoutubeLink(ytId: string){
        return this.http.post("https://localhost:44324/api/YoutubeLink", {Nom: "YoutubeLink", YoutubeId: ytId}, {responseType: 'text'});
    }

    getYoutubeLink(){
        return this.http.get<{id: number, nom: string, youtubeId: string}[]>("https://localhost:44324/api/YoutubeLink", {
            reportProgress: true,
            observe: 'events'   
          });
    }

    deleteYoutubeLink(){
        return this.http.delete("https://localhost:44324/api/YoutubeLink", {responseType: 'text'});
    }

}