package br.fai.lds.elderconnect.dto.contract;

import br.fai.lds.elderconnect.domain.Contract;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingContractDto {

    private int rating;
    private String comment;

    public Contract toContract(){
        Contract contract = new Contract();
        contract.setRating(rating);
        contract.setComment(comment);
        return contract;
    }

}
