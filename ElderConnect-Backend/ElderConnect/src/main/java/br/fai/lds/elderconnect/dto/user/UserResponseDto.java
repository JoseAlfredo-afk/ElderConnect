package br.fai.lds.elderconnect.dto.user;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDto {

    private int id;
    private String fullname;
    private String email;
    private String phoneNumber;
    private String userType;
    private String birthDate;

    public static UserResponseDto fromUserModel(UserModel userModel) {
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId(userModel.getId());
        userResponseDto.setFullname(userModel.getFullname());
        userResponseDto.setEmail(userModel.getEmail());
        userResponseDto.setPhoneNumber(userModel.getPhoneNumber());
        userResponseDto.setUserType(userModel.getUserType().name());
        userResponseDto.setBirthDate(userModel.getBirthDate());

        return userResponseDto;
    }
}