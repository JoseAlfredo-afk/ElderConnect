package br.fai.lds.elderconnect.ports_and_adapters.port.dao.appointment;

import br.fai.lds.elderconnect.domain.Appointment;

import java.util.List;

public interface ReadBySeniorIdDao {

    List<Appointment> readyBySeniorIdDao(int seniorId);

}
