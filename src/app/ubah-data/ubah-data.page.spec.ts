import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UbahDataPage } from './ubah-data.page';

describe('UbahDataPage', () => {
  let component: UbahDataPage;
  let fixture: ComponentFixture<UbahDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbahDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UbahDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
