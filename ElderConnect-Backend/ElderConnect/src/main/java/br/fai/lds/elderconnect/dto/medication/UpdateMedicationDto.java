package br.fai.lds.elderconnect.dto.medication;


import br.fai.lds.elderconnect.domain.Medication;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMedicationDto {

    private int id;
    private String medicationName;
    private String dose;

    public Medication toMedication() {
        final Medication medication = new Medication();
        medication.setId(id);
        medication.setMedicationName(medicationName);
        medication.setDose(dose);
        return medication;
    }
}
