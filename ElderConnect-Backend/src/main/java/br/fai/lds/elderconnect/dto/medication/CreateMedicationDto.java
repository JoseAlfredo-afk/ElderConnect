package br.fai.lds.elderconnect.dto.medication;

import br.fai.lds.elderconnect.domain.Medication;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMedicationDto {

    private String medicationName;
    private String dose;
    private int seniorId;

    public Medication toMedication() {

        final Medication medication = new Medication();

        medication.setMedicationName(medicationName);
        medication.setDose(dose);
        medication.setSeniorId(seniorId);

        return medication;
    }
}
