package br.fai.lds.elderconnect.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordDto {

    private int id;
    private String oldPassword;
    private String newPassword;

}
