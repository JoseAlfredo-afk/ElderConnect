package br.fai.lds.elderconnect.dto.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.domain.UserType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {

    private int id;
    private String fullname;
    private String email;
    private String phoneNumber;
    private UserType userType;
    private String birthDate;

    public static UserResponseDto fromUserModel(UserModel userModel) {
        UserResponseDto dto = new UserResponseDto();

        dto.setId(userModel.getId());
        dto.setFullname(userModel.getFullname());
        dto.setEmail(userModel.getEmail());
        dto.setPhoneNumber(userModel.getPhoneNumber());
        dto.setUserType(userModel.getUserType());
        dto.setBirthDate(userModel.getBirthDate());

        return dto;
    }
}