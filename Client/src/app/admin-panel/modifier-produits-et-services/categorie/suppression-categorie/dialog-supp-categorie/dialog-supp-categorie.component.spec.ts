import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuppCategorieComponent } from './dialog-supp-categorie.component';

describe('DialogSuppCategorieComponent', () => {
  let component: DialogSuppCategorieComponent;
  let fixture: ComponentFixture<DialogSuppCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuppCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuppCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
