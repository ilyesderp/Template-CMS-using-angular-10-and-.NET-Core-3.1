import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionCategorieComponent } from './suppression-categorie.component';

describe('SuppressionCategorieComponent', () => {
  let component: SuppressionCategorieComponent;
  let fixture: ComponentFixture<SuppressionCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppressionCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppressionCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
