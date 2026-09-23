package br.fai.lds.elderconnect.dto.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationDto {

    private String email;
    private String password;

}
