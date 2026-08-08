package br.fai.lds.elderconnect.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SeniorCaregiver {
    private int id;
    private UserModel senior;
    private UserModel caregiver;
}
