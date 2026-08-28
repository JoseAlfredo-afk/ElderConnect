import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCaregiver } from './profile-caregiver';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProfileCaregiver', () => {
  let component: ProfileCaregiver;
  let fixture: ComponentFixture<ProfileCaregiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCaregiver],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ id: '1' }),
            snapshot: { queryParams: { id: '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCaregiver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar os dados do cuidador se o ID for valido', () => {
    component.carregarCuidador();
    expect(component.cuidador).not.toBeNull();
    expect(component.cuidador?.nome).toBe('Maria Silva');
  });

  it('deve solicitar o vinculo e atualizar o estado de vinculo ativo', () => {
    const spySetItem = vi.spyOn(Storage.prototype, 'setItem');
    vi.spyOn(window, 'alert').mockImplementation(() => { });

    component.carregarCuidador();
    component.solicitarVinculo();

    expect(component.temVinculoAtivo).toBe(true);
    expect(spySetItem).toHaveBeenCalledWith(
      'elderconnect_vinculo',
      expect.any(String)
    );
  });

  it('deve remover o vinculo ao confirmar', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const spyRemoveItem = vi.spyOn(Storage.prototype, 'removeItem');

    component.temVinculoAtivo = true;
    component.removerVinculo();

    expect(component.temVinculoAtivo).toBe(false);
    expect(spyRemoveItem).toHaveBeenCalledWith('elderconnect_vinculo');
  });
});