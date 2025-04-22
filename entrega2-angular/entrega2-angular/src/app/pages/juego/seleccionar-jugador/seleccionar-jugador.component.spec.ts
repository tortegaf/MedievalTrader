import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarJugadorComponent } from './seleccionar-jugador.component';

describe('SeleccionarJugadorComponent', () => {
  let component: SeleccionarJugadorComponent;
  let fixture: ComponentFixture<SeleccionarJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarJugadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
