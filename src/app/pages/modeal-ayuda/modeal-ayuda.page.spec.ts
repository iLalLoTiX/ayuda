import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModealAyudaPage } from './modeal-ayuda.page';

describe('ModealAyudaPage', () => {
  let component: ModealAyudaPage;
  let fixture: ComponentFixture<ModealAyudaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModealAyudaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModealAyudaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
