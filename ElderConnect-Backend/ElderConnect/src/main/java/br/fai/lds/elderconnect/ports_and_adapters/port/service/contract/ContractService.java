package br.fai.lds.elderconnect.ports_and_adapters.port.service.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CrudService;

public interface ContractService extends CrudService<Contract>, FinishContractService, FindByCaregiverIdService, FindBySeniorIdService, RatingContractService, CancelContractService {
}
