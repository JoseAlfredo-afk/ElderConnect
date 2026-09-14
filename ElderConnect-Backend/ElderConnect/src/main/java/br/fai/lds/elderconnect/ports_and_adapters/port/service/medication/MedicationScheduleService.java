package br.fai.lds.elderconnect.ports_and_adapters.port.service.medication;

import br.fai.lds.elderconnect.domain.MedicationSchedule;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CrudService;

public interface MedicationScheduleService extends CrudService<MedicationSchedule>, FindBySeniorId {
}
