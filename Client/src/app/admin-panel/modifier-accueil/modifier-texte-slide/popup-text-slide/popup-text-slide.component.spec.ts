/*import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupTextSlideComponent } from './popup-text-slide.component';
import { HttpClient } from '@angular/common/http';
import { DataSotrageService } from 'src/app/shared/data-storage.service';




describe('PopupTextSlideComponent', () => {
  let http: HttpClient;
  let dataStorageService: DataSotrageService
  let component: PopupTextSlideComponent;
  let fixture: ComponentFixture<PopupTextSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupTextSlideComponent ],
      imports: [ HttpClient ],
      providers: [DataSotrageService]
    })
    .compileComponents();

    http = TestBed.inject(HttpClient);
    dataStorageService = TestBed.inject(DataSotrageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTextSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*let dataStorageService: DataSotrageService;
  beforeEach(inject([DataSotrageService], _dataStorageService => dataStorageService = _dataStorageService));*/

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });
});
*/