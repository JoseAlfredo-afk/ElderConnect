package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.domain.UserType;
import lombok.Getter;
import lombok.Setter;

import javax.lang.model.type.UnionType;

@Setter
@Getter
public class CreateUserDto {

    private String fullname;
    private String cpf;
    private String birthDate;
    private String phoneNumber;
    private String email;
    private String password;
    private UserType userType;

    public UserModel toUserModel(){
        final UserModel userModel = new UserModel();
        userModel.setFullname(fullname);
        userModel.setCpf(cpf);
        userModel.setPhoneNumber(phoneNumber);
        userModel.setEmail(email);
        userModel.setPassword(password);
        userModel.setUserType(userType);
        return userModel;
    }

}
