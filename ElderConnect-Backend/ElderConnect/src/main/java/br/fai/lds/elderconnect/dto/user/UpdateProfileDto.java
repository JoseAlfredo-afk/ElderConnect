package br.fai.lds.elderconnect.dto.user;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UpdateProfileDto {

    private int id;
    private String fullname;
    private String phoneNumber;

    public UserModel toUserModel() {
        final UserModel userModel = new UserModel();
        userModel.setId(id);
        userModel.setFullname(fullname);
        userModel.setPhoneNumber(phoneNumber);
        return userModel;
    }
}
