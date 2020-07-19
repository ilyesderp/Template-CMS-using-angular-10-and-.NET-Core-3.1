import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSotrageService } from '../../../../shared/data-storage.service';

@Component({
  selector: 'app-popup-elements',
  templateUrl: './popup-elements.component.html',
  styleUrls: ['./popup-elements.component.css']
})
export class PopupElementsComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: {img: string, device: string}, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
  }


  attributionSlide1(data: string, device: string){
    console.log(data);

    this.dataStorageService.postSlide1ToServer(data, device).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectionnée a été insérée dans le slide 1 !");
  }
  attributionSlide2(data: string, device: string){

    this.dataStorageService.postSlide2ToServer(data, device).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectionnée a été insérée dans le slide 2 !");
  }
  attributionSlide3(data: string, device: string){

    this.dataStorageService.postSlide3ToServer(data, device).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectionnée a été insérée dans le slide 3 !");
  }
  attributionSlide4(data: string, device: string){

    this.dataStorageService.postSlide4ToServer(data, device).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectionnée a été insérée dans le slide 4 !");
  }
  attributionSlide5(data: string, device: string){

    this.dataStorageService.postSlide5ToServer(data, device).subscribe(response => {
      console.log(response);
    });
    alert("L'image selectionnée a été insérée dans le slide 5 !");
  }

}
