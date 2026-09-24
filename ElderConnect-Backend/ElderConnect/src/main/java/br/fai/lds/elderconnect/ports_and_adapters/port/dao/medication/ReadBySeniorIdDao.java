package br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication;

import br.fai.lds.elderconnect.domain.MedicationSchedule;

import java.util.List;

public interface ReadBySeniorIdDao {

    List<MedicationSchedule> readyBySeniorId(int seniorId);
}
