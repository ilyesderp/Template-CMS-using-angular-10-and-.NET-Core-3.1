import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNav } from './side-nav.component';




describe('SideNav', () => {
  let component: SideNav;
  let fixture: ComponentFixture<SideNav>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNav ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*let dataStorageService: DataSotrageService;
  beforeEach(inject([DataSotrageService], _dataStorageService => dataStorageService = _dataStorageService));*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
