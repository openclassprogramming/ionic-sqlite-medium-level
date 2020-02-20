import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TambahDataPage } from './tambah-data.page';

describe('TambahDataPage', () => {
  let component: TambahDataPage;
  let fixture: ComponentFixture<TambahDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TambahDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
