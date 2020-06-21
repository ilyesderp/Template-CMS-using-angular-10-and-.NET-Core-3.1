import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTexteSlideComponent } from './modifier-texte-slide.component';

describe('ModifierTexteSlideComponent', () => {
  let component: ModifierTexteSlideComponent;
  let fixture: ComponentFixture<ModifierTexteSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTexteSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTexteSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
