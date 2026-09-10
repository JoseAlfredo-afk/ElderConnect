package br.fai.lds.elderconnect.dto.user;

import br.fai.lds.elderconnect.domain.UserModel;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponseDto {

    private int id;
    private String fullname;
    private String email;
    private String phoneNumber;
    private String userType;
    private String birthDate;
    private String availabilitySchedule;
    private String streetAddress;
    private String specialization;
    private String city;
    private String neighborhood;
    private String experience;


    public static UserResponseDto fromUserModel(UserModel userModel) {
        UserResponseDto userResponseDto = new UserResponseDto();

        userResponseDto.setId(userModel.getId());
        userResponseDto.setFullname(userModel.getFullname());
        userResponseDto.setEmail(userModel.getEmail());
        userResponseDto.setPhoneNumber(userModel.getPhoneNumber());
        userResponseDto.setUserType(userModel.getUserType().name());
        userResponseDto.setBirthDate(userModel.getBirthDate());

        if(userModel.getUserType() == UserModel.UserType.CUIDADOR){
            userResponseDto.setAvailabilitySchedule(userModel.getAvailabilitySchedule());
            userResponseDto.setStreetAddress(userModel.getStreetAddress());
            userResponseDto.setSpecialization(userModel.getSpecialization());
            userResponseDto.setCity(userModel.getCity());
            userResponseDto.setNeighborhood(userModel.getNeighborhood());
            userResponseDto.setExperience(userModel.getExperience());
        }

        return userResponseDto;
    }
}