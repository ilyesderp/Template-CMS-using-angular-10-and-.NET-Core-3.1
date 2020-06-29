import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPanelComponent } from './admin-panel.component';




describe('AdminPanel', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*let dataStorageService: DataSotrageService;
  beforeEach(inject([DataSotrageService], _dataStorageService => dataStorageService = _dataStorageService));*/

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
