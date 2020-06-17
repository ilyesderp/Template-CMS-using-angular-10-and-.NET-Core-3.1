import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-popup-elements',
  templateUrl: './popup-elements.component.html',
  styleUrls: ['./popup-elements.component.css']
})
export class PopupElementsComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
  }


  attributionSlide1(data: string){
    console.log(data);

    this.dataStorageService.postSlide1ToServer(data).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectinnée a été insérée dans le slide 1 !");
  }
  attributionSlide2(data: string){

    this.dataStorageService.postSlide2ToServer(data).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectinnée a été insérée dans le slide 2 !");
  }
  attributionSlide3(data: string){

    this.dataStorageService.postSlide3ToServer(data).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectinnée a été insérée dans le slide 3 !");
  }
  attributionSlide4(data: string){

    this.dataStorageService.postSlide4ToServer(data).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectinnée a été insérée dans le slide 4 !");
  }
  attributionSlide5(data: string){

    this.dataStorageService.postSlide5ToServer(data).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectinnée a été insérée dans le slide 5 !");
  }

}