import { Component, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { SCREEN_SIZE } from './screen-size.enum';
import { ResizeService } from './resize.service';

@Component({
  selector: 'app-size-detector',
  templateUrl: './size-detector.component.html',
  styleUrls: ['./size-detector.component.css']
})
export class SizeDetectorComponent implements AfterViewInit {

  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs',
      css: `visible-xs-block`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm',
      css: `visible-sm-block`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md',
      css: `visible-md-block`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg',
      css: `visible-lg-block`
    }
  ];

  constructor(private elementRef: ElementRef, private resizeSvc: ResizeService) { }

  @HostListener("window:resize", [])
  private onResize() {
    this.detectScreenSize();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const currentSize = this.sizes.find(x => {
      const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);
      const isVisible = window.getComputedStyle(el).display != 'none';

      return isVisible;
    });

    this.resizeSvc.onResize(currentSize.id);
  }
}
