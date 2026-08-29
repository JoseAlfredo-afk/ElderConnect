package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.domain.ContractStatus;
import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateContractDto {

    private String startDate;
    private float contractValue;
    private String workingHours;
    private String description;
    private int seniorId;
    private int caregiverId;

    public Contract toContract(){
        final Contract contract = new Contract();
        contract.setStartDate(startDate);
        contract.setContractValue(contractValue);
        contract.setWorkingHours(workingHours);
        contract.setDescription(description);
        contract.setSeniorId(seniorId);
        contract.setCaregiverId(caregiverId);
        return contract;
    }
}
