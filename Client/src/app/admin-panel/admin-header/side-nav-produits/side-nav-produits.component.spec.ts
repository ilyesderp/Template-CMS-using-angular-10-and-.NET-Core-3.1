import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavProduitsComponent } from './side-nav-produits.component';

describe('SideNavProduitsComponent', () => {
  let component: SideNavProduitsComponent;
  let fixture: ComponentFixture<SideNavProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
