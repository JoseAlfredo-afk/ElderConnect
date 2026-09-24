package br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract;

import br.fai.lds.elderconnect.domain.Contract;

import java.util.List;

public interface ReadByCaregiverIdDao {

    List<Contract> readByCaregiverId(int caregiverId);

}
