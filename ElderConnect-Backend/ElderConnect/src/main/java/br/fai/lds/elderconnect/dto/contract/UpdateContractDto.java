package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateContractDto {

    private int id;
    private float contractValue;
    private String workingHours;
    private String description;

    public Contract toContract(){
        final Contract contract = new Contract();
        contract.setId(id);
        contract.setContractValue(contractValue);
        contract.setWorkingHours(workingHours);
        contract.setDescription(description);
        return contract;
    }




}
