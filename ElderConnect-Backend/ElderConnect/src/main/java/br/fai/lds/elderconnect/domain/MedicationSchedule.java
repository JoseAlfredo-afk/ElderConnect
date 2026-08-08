package br.fai.lds.elderconnect.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicationSchedule {
    private int id;
    private String dosageInstructions;
    private String intakeTime;
    private UserModel senior;
    private Medication medication;


}
