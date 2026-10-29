package br.fai.lds.elderconnect.domain;

import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.appointment.AppointmentServiceAdapter;
import org.junit.Test;
import org.mockito.InjectMocks;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class AppointmentTest {

    @InjectMocks
    private AppointmentServiceAdapter appointmentServiceAdapter;

    @Test
    public void createAppointmentTestWithSuccess() {
        Appointment entity = new Appointment();

        entity.setDate("30/11/2028");
        entity.setTime("20:23");
        entity.setTitle("Teste01");
        entity.setType("caminhada");
        entity.setResponsible("cuidador");
        entity.setNotes("Ajudar no banho");
        entity.setSeniorId(10);

        assertEquals("30/11/2028", entity.getDate());
        assertEquals("20:23", entity.getTime());
        assertEquals("Teste01", entity.getTitle());
        assertEquals("caminhada", entity.getType());
        assertEquals("cuidador", entity.getResponsible());
        assertEquals("Ajudar no banho", entity.getNotes());
        assertEquals(10, entity.getSeniorId());
    }

    @Test
    public void updateAppointmentTitleTest() {
        Appointment entity = new Appointment();

        entity.setTitle("Caminhada");
        assertEquals("Caminhada", entity.getTitle());

        entity.setTitle("Consulta médica");
        assertEquals("Consulta médica", entity.getTitle());
    }


}
