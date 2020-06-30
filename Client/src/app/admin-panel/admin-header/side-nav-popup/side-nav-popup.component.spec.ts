import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavPopupComponent } from './side-nav-popup.component';

describe('SideNavPopupComponent', () => {
  let component: SideNavPopupComponent;
  let fixture: ComponentFixture<SideNavPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
