package br.fai.lds.elderconnect.dto.medicationschedule;

import br.fai.lds.elderconnect.domain.Medication;
import br.fai.lds.elderconnect.domain.MedicationSchedule;
import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateMedicationScheduleDto {

    private String dosageInstructions;
    private String intakeTime;
    private UserModel senior;
    private Medication medication;

    public MedicationSchedule toMedicationSchedule(){
        final MedicationSchedule medicationSchedule = new MedicationSchedule();
        medicationSchedule.setMedication(medication);
        medicationSchedule.setSenior(senior);
        medicationSchedule.setDosageInstructions(dosageInstructions);
        medicationSchedule.setIntakeTime(intakeTime);
        return medicationSchedule;

    }

}
