import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCaregiver, Cuidador } from './search-caregiver';
import { provideRouter } from '@angular/router';

describe('SearchCaregiver', () => {
  let component: SearchCaregiver;
  let fixture: ComponentFixture<SearchCaregiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCaregiver],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCaregiver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista inicial de cuidadores', () => {
    expect(component.cuidadores.length).toBeGreaterThan(0);
  });

  it('deve filtrar os cuidadores por nome', () => {
    component.termoBusca = 'Maria';
    const resultados = component.cuidadoresFiltrados;

    expect(resultados.length).toBe(1);
    expect(resultados[0].nome).toContain('Maria');
  });

  it('deve filtrar os cuidadores por cidade', () => {
    component.cidadeFiltro = 'Pouso Alegre';
    const resultados = component.cuidadoresFiltrados;

    expect(resultados.every((c: Cuidador) => c.cidade.includes('Pouso Alegre'))).toBe(true);
  });

  it('deve retornar todos os cuidadores quando os filtros estiverem vazios', () => {
    component.termoBusca = '';
    component.cidadeFiltro = '';

    expect(component.cuidadoresFiltrados.length).toBe(component.cuidadores.length);
  });

  it('deve solicitar o vínculo com sucesso e salvar no localStorage', () => {
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');
    const spyAlert = vi.spyOn(window, 'alert').mockImplementation(() => { });

    const cuidadorExemplo = component.cuidadores[0];
    component.solicitarVinculo(cuidadorExemplo);

    expect(component.cuidadorContratadoId).toBe(cuidadorExemplo.id);
    expect(spySetItem).toHaveBeenCalledWith(
      'elderconnect_vinculo',
      expect.any(String)
    );
    expect(spyAlert).toHaveBeenCalled();

    spySetItem.mockRestore();
    spyAlert.mockRestore();
  });

  it('deve encerrar o vínculo ao confirmar remoção', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const spyRemoveItem = vi.spyOn(Storage.prototype, 'removeItem');

    component.cuidadorContratadoId = 1;
    component.removerVinculo();

    expect(component.cuidadorContratadoId).toBeNull();
    expect(spyRemoveItem).toHaveBeenCalledWith('elderconnect_vinculo');

    spyRemoveItem.mockRestore();
  });
});