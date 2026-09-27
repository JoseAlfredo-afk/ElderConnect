package br.fai.lds.elderconnect.dto.appointment;

import br.fai.lds.elderconnect.domain.Appointment;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAppointmentDto {

    private String date;
    private String time;
    private String title;
    private String type;
    private String responsible;
    private String notes;

    public Appointment toAppointment() {

        final Appointment appointment = new Appointment();

        appointment.setDate(date);
        appointment.setTime(time);
        appointment.setTitle(title);
        appointment.setType(type);
        appointment.setResponsible(responsible);
        appointment.setNotes(notes);

        return appointment;

    }
}
