import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierProduitListComponent } from './modifier-produit-list.component';

describe('ModifierProduitListComponent', () => {
  let component: ModifierProduitListComponent;
  let fixture: ComponentFixture<ModifierProduitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierProduitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierProduitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
