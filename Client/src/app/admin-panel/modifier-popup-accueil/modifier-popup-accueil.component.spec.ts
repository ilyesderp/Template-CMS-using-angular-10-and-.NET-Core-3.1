import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPopupAccueilComponent } from './modifier-popup-accueil.component';

describe('ModifierPopupAccueilComponent', () => {
  let component: ModifierPopupAccueilComponent;
  let fixture: ComponentFixture<ModifierPopupAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierPopupAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierPopupAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
