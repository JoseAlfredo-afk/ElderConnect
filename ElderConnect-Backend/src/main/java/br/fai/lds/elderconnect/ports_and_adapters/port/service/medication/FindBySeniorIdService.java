package br.fai.lds.elderconnect.ports_and_adapters.port.service.medication;

import br.fai.lds.elderconnect.domain.MedicationSchedule;

import java.util.List;

public interface FindBySeniorIdService {

    List<MedicationSchedule> findBySeniorId(final int seniorId);

}
