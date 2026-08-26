package br.fai.lds.elderconnect.domain;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserModel {
    private int id;
    private String cpf;
    private String fullname;
    private String email;
    private String password;
    private String phoneNumber;
    private UserType userType;
    //Usuario IDOSO
    private String birthDate;
    //USuario CUIDADOR
    private String availabilitySchedule;
    private String streetAddress;
    private String specialization;
    private String city;
    private String neighborhood;
    private String experience;

}
