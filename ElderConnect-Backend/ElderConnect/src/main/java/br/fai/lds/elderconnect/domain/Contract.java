package br.fai.lds.elderconnect.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Contract {
    private int id;
    private String contractNumber;
    private String startDate;
    private String endDate;
    private float contractValue;
    private ContractStatus status;
    private String workingHours;
    private String description;
    private UserModel senior;
    private UserModel caregiver;
    private String comment;
    private int rating;



}
