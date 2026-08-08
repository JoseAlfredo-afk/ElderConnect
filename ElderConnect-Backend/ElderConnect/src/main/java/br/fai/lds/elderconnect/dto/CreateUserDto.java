package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateUserDto {

    private String fullname;
    private String cpf;
    private String birthDate;
    private String phoneNumber;
    private String email;
    private String password;
    private String userType;

    public UserModel toUserModel(){
        final UserModel userModel = new UserModel();
        userModel.setFullname(fullname);
        userModel.setCpf(cpf);
        userModel.setBirthDate(birthDate);
        userModel.setPhoneNumber(phoneNumber);
        userModel.setEmail(email);
        userModel.setPassword(password);
        userModel.setUserType(userType);
        return userModel;
    }

}
