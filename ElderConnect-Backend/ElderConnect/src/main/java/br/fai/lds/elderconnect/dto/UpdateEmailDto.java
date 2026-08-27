package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmailDto {

    private int id;
    private String password;
    private String newEmail;

}
