package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.medication;

import br.fai.lds.elderconnect.domain.Medication;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.medication.MedicationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MedicationServiceAdapter implements MedicationService {

    @Autowired
    private MedicationDao medicationDao;

    @Override
    public int create(Medication medication) {

        if(medication == null){
            return 0;
        }

        if(medication.getMedicationName().isEmpty()){
            return 0;
        }

        if(medication.getDose().isEmpty()){
            return 0;
        }

        return medicationDao.add(medication);
    }

    @Override
    public void delete(int id) {
        if(isIdInvalid(id)){
            return;
        }
        medicationDao.remove(id);

    }

    @Override
    public Medication findById(int id) {
        if (isIdInvalid(id)) {
            return null;
        }
        return medicationDao.readyById(id);
    }

    @Override
    public List<Medication> findAll() {
        return medicationDao.readAll();
    }

    @Override
    public boolean update(int id, Medication medication) {
        if (isIdInvalid(id) || medication == null) {
            return false;
        }

        Medication dataToUpdate = findById(id);

        if (dataToUpdate == null) {
            return false;
        }

        if (medication.getMedicationName().isEmpty()) {
            return false;
        }

        if (medication.getDose().isEmpty()) {
            return false;
        }

        dataToUpdate.setMedicationName(medication.getMedicationName());
        dataToUpdate.setDose(medication.getDose());

        medicationDao.updateInformation(id,dataToUpdate);
        return true;
    }

    private boolean isIdInvalid(int id) {
        return id <= 0 ? true: false;
    }
}
