import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAcceuilImgComponent } from './popup-acceuil-img.component';

describe('PopupAcceuilImgComponent', () => {
  let component: PopupAcceuilImgComponent;
  let fixture: ComponentFixture<PopupAcceuilImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAcceuilImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAcceuilImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
