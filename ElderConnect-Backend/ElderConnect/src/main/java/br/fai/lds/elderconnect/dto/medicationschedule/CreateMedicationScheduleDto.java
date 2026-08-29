package br.fai.lds.elderconnect.dto.medicationschedule;

import br.fai.lds.elderconnect.domain.MedicationSchedule;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateMedicationScheduleDto {

    private String dosageInstructions;
    private String intakeTime;
    private int seniorId;
    private int medicationId;

    public MedicationSchedule toMedicationSchedule(){
        final MedicationSchedule medicationSchedule = new MedicationSchedule();
        medicationSchedule.setMedicationId(medicationId);
        medicationSchedule.setSeniorId(seniorId);
        medicationSchedule.setDosageInstructions(dosageInstructions);
        medicationSchedule.setIntakeTime(intakeTime);
        return medicationSchedule;

    }

}
