package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.domain.ContractStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContractResponseDto {
    private int id;
    private String contractNumber;
    private String seniorName;
    private String caregiverName;
    private String startDate;
    private String endDate;
    private float contractValue;
    private ContractStatus status;
    private String workingHours;
    private String description;
    private int rating;
    private String comment;

    public static ContractResponseDto fromContract(Contract contract, String seniorName, String caregiverName){

        ContractResponseDto contractResponseDto = new ContractResponseDto();

        contractResponseDto.setId(contract.getId());
        contractResponseDto.setContractNumber(contract.getContractNumber());
        contractResponseDto.setSeniorName(seniorName);
        contractResponseDto.setCaregiverName(caregiverName);
        contractResponseDto.setStartDate(contract.getStartDate());
        contractResponseDto.setEndDate(contract.getEndDate());
        contractResponseDto.setContractValue(contract.getContractValue());
        contractResponseDto.setStatus(contract.getStatus());
        contractResponseDto.setWorkingHours(contract.getWorkingHours());
        contractResponseDto.setDescription(contract.getDescription());
        contractResponseDto.setRating(contract.getRating());
        contractResponseDto.setComment(contract.getComment());

        return contractResponseDto;
    }
}
