package br.fai.lds.elderconnect.ports_and_adapters.port.service.appointment;

import br.fai.lds.elderconnect.domain.Appointment;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.common.FindBySeniorIdService;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CrudService;

public interface AppointmentService extends
        CrudService<Appointment>,
        FindBySeniorIdService<Appointment> {
}
