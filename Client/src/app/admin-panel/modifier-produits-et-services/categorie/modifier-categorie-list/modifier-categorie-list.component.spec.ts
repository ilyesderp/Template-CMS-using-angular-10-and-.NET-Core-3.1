import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCategorieListComponent } from './modifier-categorie-list.component';

describe('ModifierCategorieListComponent', () => {
  let component: ModifierCategorieListComponent;
  let fixture: ComponentFixture<ModifierCategorieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCategorieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCategorieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
