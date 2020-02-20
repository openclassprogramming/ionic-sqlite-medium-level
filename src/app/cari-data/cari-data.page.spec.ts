import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CariDataPage } from './cari-data.page';

describe('CariDataPage', () => {
  let component: CariDataPage;
  let fixture: ComponentFixture<CariDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CariDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CariDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
