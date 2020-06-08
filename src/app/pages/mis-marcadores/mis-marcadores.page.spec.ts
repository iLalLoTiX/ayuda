import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MisMarcadoresPage } from './mis-marcadores.page';

describe('MisMarcadoresPage', () => {
  let component: MisMarcadoresPage;
  let fixture: ComponentFixture<MisMarcadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisMarcadoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MisMarcadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
