package br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication;

import br.fai.lds.elderconnect.domain.MedicationSchedule;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud.CrudDao;

public interface MedicationScheduleDao extends CrudDao<MedicationSchedule>, ReadBySeniorIdDao {

}
