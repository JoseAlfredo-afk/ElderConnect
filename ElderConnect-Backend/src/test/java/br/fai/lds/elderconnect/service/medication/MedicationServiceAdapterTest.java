package br.fai.lds.elderconnect.service.medication;

import br.fai.lds.elderconnect.domain.Medication;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.medication.MedicationServiceAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationDao;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MedicationServiceAdapterTest {

    @Mock
    private MedicationDao medicationDao;

    @InjectMocks
    private MedicationServiceAdapter medicationServiceAdapter;

    @Test
    public void shouldCreateValidMedication() {
        Medication medication = medicationValided();

        when(medicationDao.add(medication)).thenReturn(100);

        int result = medicationServiceAdapter.create(medication);
        assertEquals(100, result);
        verify(medicationDao).add(medication);

    }

    @Test
    public void shouldRejectMedicationsWithoutDose() {
        Medication medication = medicationValided();
        medication.setDose("");

        int result = medicationServiceAdapter.create(medication);

        assertEquals(0, result);
        verifyNoInteractions(medicationDao);
    }

    @Test
    public void shouldRejectMedicationsWithoutMedicationName() {
        Medication medication = medicationValided();
        medication.setMedicationName("");

        int result = medicationServiceAdapter.create(medication);

        assertEquals(0, result);
        verifyNoInteractions(medicationDao);
    }

    @Test
    public void shouldRejectMedicationsWithoutSeniorId() {
        Medication medication = medicationValided();
        medication.setSeniorId(0);

        int result = medicationServiceAdapter.create(medication);

        assertEquals(0, result);
        verifyNoInteractions(medicationDao);
    }


    @Test
    public void shouldDeleteMedicationWithValidId() {
        medicationServiceAdapter.delete(1);

        verify(medicationDao).remove(1);
    }

    @Test
    public void shouldNotDeleteMedicationWithInvalidId() {
        medicationServiceAdapter.delete(-10);

        verifyNoInteractions(medicationDao);
    }

    @Test
    public void shouldFindMedicationById() {
        Medication medication = medicationValided();
        medication.setId(1);
        when(medicationDao.readyById(1)).thenReturn(medication);

        Medication result = medicationServiceAdapter.findById(1);

        assertSame(medication, result);
        verify(medicationDao).readyById(1);
    }

    @Test
    public void shouldReturnNullWhenMedicationDoesNotExist() {
        when(medicationDao.readyById(10)).thenReturn(null);

        Medication result = medicationServiceAdapter.findById(10);

        assertNull(result);
        verify(medicationDao).readyById(10);
    }

    @Test
    public void shouldReturnNullForInvalidMedicationId() {
        Medication result = medicationServiceAdapter.findById(-10);

        assertNull(result);
        verifyNoInteractions(medicationDao);
    }

    private Medication medicationValided() {
        Medication medication = new Medication();
        medication.setMedicationName("Dipirona");
        medication.setDose("1 comprimido");
        medication.setSeniorId(1);
        return medication;
    }
}
