import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomVidComponent } from './custom-vid.component';

describe('CustomVidComponent', () => {
  let component: CustomVidComponent;
  let fixture: ComponentFixture<CustomVidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomVidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomVidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
