import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImageText } from '../accueil/slider/slider.component';



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


    postSlide1ToServer(slidePath: string, device: string){
        console.log("this is slidePath arg in put req: " + slidePath);
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide1", "Path": slidePath, "Device": device }, {responseType: 'text'});
    }
    postSlide2ToServer(slidePath: string, device: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide2", "Path": slidePath, "Device": device }, {responseType: 'text'});
    }
    postSlide3ToServer(slidePath: string, device: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide3", "Path": slidePath, "Device": device }, {responseType: 'text'});
    }
    postSlide4ToServer(slidePath: string, device: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide4", "Path": slidePath, "Device": device }, {responseType: 'text'});
    }
    postSlide5ToServer(slidePath: string, device: string){
        return this.http.put('https://localhost:44324/api/slides', { "SlideNumber": "Slide5", "Path": slidePath, "Device": device }, {responseType: 'text'});
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
        return this.http.get<ImageText[]>("https://localhost:44324/api/ImageText");
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


    postCustomImage(formData: FormData){
        return this.http.post("https://localhost:44324/api/CustomImage", formData, {
            reportProgress: true,
            observe: 'events', 
            responseType: 'text'
        });
    }

    getCustomImage(){
        return this.http.get<{id: any, nom: string, path: string}>("https://localhost:44324/api/CustomImage");
    }

    deleteCustomImage(){
        return this.http.delete("https://localhost:44324/api/CustomImage", {responseType: 'text'});
    }

    postChoixPopup(monChoix: string){
        return this.http.post("https://localhost:44324/api/ChoixPopup", {choix: monChoix}, {responseType: 'text'});
    }

    getChoixPopup(){
        return this.http.get("https://localhost:44324/api/ChoixPopup", {responseType: 'text'});
    }

    getTauxChangeJson(){
        return this.http.get("http://localhost:4444/change.json");
    }

    postCategorie(data){
        return this.http.post('https://localhost:44324/api/Categorie', data, {responseType: 'text'});
    }

    getAllCategoriesFromServer(){
        return this.http.get<{id: any, titre: string, 
            entete: string, 
            parent: string, 
            children: string, 
            etiquette1: string, 
            etiquette2: string, 
            miniature: string}[]>("https://localhost:44324/api/Categorie");
    }


    createProduct(dataForm){
        return this.http.post("https://localhost:44324/api/Produit", dataForm, {responseType: 'text'});
    }

}