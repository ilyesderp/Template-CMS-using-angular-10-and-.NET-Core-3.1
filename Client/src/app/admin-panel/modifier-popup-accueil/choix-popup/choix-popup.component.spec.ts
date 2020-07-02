import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixPopupComponent } from './choix-popup.component';

describe('ChoixPopupComponent', () => {
  let component: ChoixPopupComponent;
  let fixture: ComponentFixture<ChoixPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
