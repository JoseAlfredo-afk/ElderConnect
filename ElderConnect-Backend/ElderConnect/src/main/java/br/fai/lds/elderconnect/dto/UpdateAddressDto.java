package br.fai.lds.elderconnect.dto;

import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAddressDto {

    private int id;
    private String streetAddress;
    private String city;
    private String neighborhood;

    public UserModel toUserModel(){
        final UserModel userModel = new UserModel();
        userModel.setId(id);
        userModel.setStreetAddress(streetAddress);
        userModel.setCity(city);
        userModel.setNeighborhood(neighborhood);
        return userModel;
    }
}
