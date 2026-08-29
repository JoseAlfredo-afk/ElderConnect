package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.domain.ContractStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FinishContractDto {

    private String endDate;

    public Contract toContract(){
        Contract contract = new Contract();
        contract.setEndDate(endDate);
        contract.setStatus(ContractStatus.COMPLETO);
        return contract;
    }
}
