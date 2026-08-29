package br.fai.lds.elderconnect.dto.medicationschedule;

import br.fai.lds.elderconnect.domain.MedicationSchedule;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMedicationScheduleDto {

    private int id;
    private String dosageInstructions;
    private String intakeTime;

    public MedicationSchedule medicationSchedule(){
        final MedicationSchedule medicationSchedule = new MedicationSchedule();
        medicationSchedule.setId(id);
        medicationSchedule.setIntakeTime(intakeTime);
        medicationSchedule.setDosageInstructions(dosageInstructions);
        return medicationSchedule;
    }
}
