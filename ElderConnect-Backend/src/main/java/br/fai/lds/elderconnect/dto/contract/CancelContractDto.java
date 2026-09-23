package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelContractDto {

    private String endDate;

    public Contract toContract() {
        Contract contract = new Contract();

        contract.setEndDate(endDate);
        contract.setStatus(Contract.ContractStatus.CANCELADO);

        return contract;
    }
}
