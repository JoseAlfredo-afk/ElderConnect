package br.fai.lds.elderconnect.ports_and_adapters.port.service.contract;

import br.fai.lds.elderconnect.domain.Contract;

import java.util.List;

public interface FindByCaregiverIdService {

    List<Contract> findByCaregiverId(final int caregiverId);

}
