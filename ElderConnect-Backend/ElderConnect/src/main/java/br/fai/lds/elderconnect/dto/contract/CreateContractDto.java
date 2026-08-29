package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateContractDto {

    private String contractNumber;
    private String startDate;
    private String endDate;
    private float contractValue;
    private String status;
    private String workingHours;
    private String description;
    private UserModel senior;
    private UserModel caregiver;

    public Contract toContract(){
        final Contract contract = new Contract();
        contract.setContractNumber(contractNumber);
        contract.setStartDate(startDate);
        contract.setEndDate(endDate);
        contract.setContractValue(contractValue);
        contract.setStatus(status);
        contract.setWorkingHours(workingHours);
        contract.setDescription(description);
        contract.setSenior(senior);
        contract.setCaregiver(caregiver);
        return contract;
    }
}
