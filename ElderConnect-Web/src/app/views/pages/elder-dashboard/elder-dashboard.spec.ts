import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElderDashboard } from './elder-dashboard';
import { provideRouter } from '@angular/router';

describe('ElderDashboard', () => {
  let component: ElderDashboard;
  let fixture: ComponentFixture<ElderDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElderDashboard],
      providers: [
        provideRouter([]) // Prover dependências de roteamento para evitar erros com routerLink
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElderDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente com sucesso', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar com o nome de usuário José', () => {
    expect(component.nomeUsuario).toBe('José');
  });

  it('deve possuir lista de próximos medicamentos cadastrada', () => {
    expect(component.proximosMedicamentos.length).toBeGreaterThan(0);
  });
});