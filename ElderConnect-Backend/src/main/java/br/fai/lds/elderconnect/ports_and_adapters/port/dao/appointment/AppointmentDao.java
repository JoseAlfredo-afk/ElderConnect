package br.fai.lds.elderconnect.ports_and_adapters.port.dao.appointment;

import br.fai.lds.elderconnect.domain.Appointment;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.common.ReadBySeniorIdDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud.CrudDao;

public interface AppointmentDao extends
        CrudDao<Appointment>,
        ReadBySeniorIdDao<Appointment> {
}
