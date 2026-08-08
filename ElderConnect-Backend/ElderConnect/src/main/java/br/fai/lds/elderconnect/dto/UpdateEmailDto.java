package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmailDto {

    private int id;
    private String email;

    public UserModel toUserModel() {
        final UserModel userModel = new UserModel();
        userModel.setId(id);
        userModel.setEmail(email);
        return userModel;
    }

}
