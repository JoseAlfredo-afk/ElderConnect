import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCaregivers } from './search-caregiver';
import { provideRouter } from '@angular/router';

describe('SearchCaregivers', () => {
  let component: SearchCaregivers;
  let fixture: ComponentFixture<SearchCaregivers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCaregivers],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCaregivers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista inicial de cuidadores', () => {
    expect(component.cuidadores.length).toBeGreaterThan(0);
  });

  it('deve resetar os filtros ao chamar limparFiltros', () => {
    component.cidadeSelecionada = 'Goiania - GO';
    component.limparFiltros();
    expect(component.cidadeSelecionada).toBe('Todas');
  });
});