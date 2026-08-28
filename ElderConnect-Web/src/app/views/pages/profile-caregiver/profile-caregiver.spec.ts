import { TestBed } from '@angular/core/testing';
import { ProfileCaregiver } from './profile-caregiver';
import { provideRouter } from '@angular/router';

describe('ProfileCaregiver', () => {
  beforeEach(async () => {
    // Limpa o localStorage antes de cada teste para isolar o estado
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ProfileCaregiver],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('deve criar o componente com sucesso', () => {
    const fixture = TestBed.createComponent(ProfileCaregiver);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('deve carregar os dados iniciais do cuidador corretamente', () => {
    const fixture = TestBed.createComponent(ProfileCaregiver);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.cuidador.nome).toBe('Maria Silva');
    expect(component.cuidador.avaliacao).toBe(4.9);
    expect(component.cuidador.totalAvaliacoes).toBe(48);
  });

  it('deve salvar o vínculo no localStorage ao solicitar vínculo', () => {
    const fixture = TestBed.createComponent(ProfileCaregiver);
    const component = fixture.componentInstance;

    // Espiona o alert para evitar que bloqueie a execução do teste
    vi.spyOn(window, 'alert').mockImplementation(() => { });

    component.solicitarVinculo();

    const vinculoSalvo = localStorage.getItem('elderconnect_vinculo');
    expect(vinculoSalvo).toBeTruthy();

    const dados = JSON.parse(vinculoSalvo!);
    expect(dados.cuidadorNome).toBe('Maria Silva');
    expect(dados.nome).toBe('José da Silva');
  });

  it('deve atualizar a avaliação e o total de avaliações se houver dados no localStorage', () => {
    const dadosAtualizados = {
      id: 1,
      nome: 'Maria Silva',
      avaliacao: 4.8,
      totalAvaliacoes: 50
    };
    localStorage.setItem('elderconnect_cuidador_1', JSON.stringify(dadosAtualizados));

    const fixture = TestBed.createComponent(ProfileCaregiver);
    const component = fixture.componentInstance;
    component.ngOnInit();

    expect(component.cuidador.avaliacao).toBe(4.8);
    expect(component.cuidador.totalAvaliacoes).toBe(50);
  });
});