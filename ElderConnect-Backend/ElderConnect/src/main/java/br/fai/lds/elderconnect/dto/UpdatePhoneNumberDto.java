package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdatePhoneNumberDto {

    private int id;
    private String phoneNumber;

    public UserModel toUserModel(){
        final UserModel userModel = new UserModel();
        userModel.setId(id);
        userModel.setPhoneNumber(phoneNumber);
        return userModel;
    }


}
