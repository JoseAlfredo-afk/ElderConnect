
package br.fai.lds.elderconnect.domain;

import br.fai.lds.elderconnect.domain.Appointment;
import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.appointment.AppointmentServiceAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.appointment.AppointmentDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.time.LocalDate;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AppointmentServiceAdapterTest {

    @InjectMocks
    private AppointmentServiceAdapter appointmentServiceAdapter;

    @Mock
    private AppointmentDao appointmentDao;

    @Mock
    private UserDao userDao;

    @Test
    public void createAppointmentTestWithSuccess() {

        // 1. Preparar o usuário idoso
        UserModel senior = new UserModel();
        senior.setUserType(UserModel.UserType.IDOSO);

        when(userDao.readyById(10)).thenReturn(senior);

        Appointment appointment = new Appointment();

        appointment.setSeniorId(10);
        appointment.setDate(LocalDate.now().plusDays(1).toString());
        appointment.setTime("20:00");
        appointment.setTitle("Consulta");
        appointment.setType("Medica");
        appointment.setResponsible("Cuidador");
        appointment.setNotes("Consulta de rotina");

        when(appointmentDao.add(appointment)).thenReturn(1);


        int result = appointmentServiceAdapter.create(appointment);


        assertEquals(1, result);
    }
}
