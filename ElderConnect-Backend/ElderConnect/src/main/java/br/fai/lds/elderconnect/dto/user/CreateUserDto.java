package br.fai.lds.elderconnect.dto.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.domain.UserType;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateUserDto {

    private String fullname;
    private String cpf;
    private String phoneNumber;
    private String email;
    private String password;
    private String birthDate;
    private UserType userType;

    public UserModel toUserModel(){
        final UserModel userModel = new UserModel();
        userModel.setFullname(fullname);
        userModel.setCpf(cpf);
        userModel.setPhoneNumber(phoneNumber);
        userModel.setEmail(email);
        userModel.setPassword(password);
        userModel.setBirthDate(birthDate);
        userModel.setUserType(userType);
        return userModel;
    }

}
