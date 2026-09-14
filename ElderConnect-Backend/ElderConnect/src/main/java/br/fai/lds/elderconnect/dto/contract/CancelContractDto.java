package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelContractDto {

    private int id;

    public Contract toContract(){
        Contract contract = new Contract();
        contract.setStatus(Contract.ContractStatus.CANCELADO);
        return contract;
    }
}
