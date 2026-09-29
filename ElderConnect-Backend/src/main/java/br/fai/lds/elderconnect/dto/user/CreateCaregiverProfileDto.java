package br.fai.lds.elderconnect.dto.user;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCaregiverProfileDto {

    private String availabilitySchedule;
    private String streetAddress;
    private String specialization;
    private String city;
    private String neighborhood;
    private String experience;
    private Float hourlyRate;
    private Integer experienceYears;
    private String availabilityPeriod;

    public UserModel ToUserModel() {

        UserModel userModel = new UserModel();

        userModel.setAvailabilitySchedule(availabilitySchedule);
        userModel.setStreetAddress(streetAddress);
        userModel.setNeighborhood(neighborhood);
        userModel.setCity(city);
        userModel.setExperience(experience);
        userModel.setSpecialization(specialization);
        userModel.setHourlyRate(hourlyRate);
        userModel.setExperienceYears(experienceYears);
        userModel.setAvailabilityPeriod(availabilityPeriod);

        return userModel;
    }
}
