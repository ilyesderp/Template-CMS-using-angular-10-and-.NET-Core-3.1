import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSotrageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-popup-text-slide',
  templateUrl: './popup-text-slide.component.html',
  styleUrls: ['./popup-text-slide.component.css']
})
export class PopupTextSlideComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dataText: string, private dataStorageService: DataSotrageService) { }

  ngOnInit(): void {
  }


  onDragEnded(event){
    //this.dataStorageService.saveTextPosition(event.x, event.y);
    console.log("x = " + event.distance.x);
    console.log("y = " + event.distance.y);
  }


}
