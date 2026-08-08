package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateFullnameDto {

    private int id;
    private String fullname;

    public UserModel toUserModel() {
        final UserModel userModel = new UserModel();
        userModel.setId(id);
        userModel.setFullname(fullname);
        return userModel;
    }
}
