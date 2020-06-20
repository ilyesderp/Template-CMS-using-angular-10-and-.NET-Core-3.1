import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierQuiSommesNousComponent } from './modifier-qui-sommes-nous.component';

describe('ModifierQuiSommesNousComponent', () => {
  let component: ModifierQuiSommesNousComponent;
  let fixture: ComponentFixture<ModifierQuiSommesNousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierQuiSommesNousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierQuiSommesNousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
