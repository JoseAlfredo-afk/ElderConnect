package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.medication;
import br.fai.lds.elderconnect.domain.Medication;
import br.fai.lds.elderconnect.domain.MedicationSchedule;
import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationScheduleDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.medication.MedicationScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicationScheduleServiceAdapter implements MedicationScheduleService {

    @Autowired
    private MedicationScheduleDao medicationScheduleDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private MedicationDao medicationDao;

    @Override
    public int create(MedicationSchedule medicationSchedule) {

        if (medicationSchedule == null){
            return 0;
        }

        if(medicationSchedule.getDosageInstructions().isEmpty()){
            return 0;
        }

        if (medicationSchedule.getIntakeTime().isEmpty()){
            return 0;
        }

        Medication medication = medicationDao.readyById(medicationSchedule.getMedicationId());

        if (medication == null){
            return 0;
        }

        UserModel userSenior = findSeniorById(medicationSchedule.getSeniorId());

        if ((userSenior == null)){
            return 0;
        }

        return medicationScheduleDao.add(medicationSchedule);
    }

    @Override
    public void delete(int id) {
        if (isIdInvalid(id)) {
            return;
        }
        medicationScheduleDao.remove(id);
    }

    @Override
    public MedicationSchedule findById(int id) {
        if (isIdInvalid(id)) {
            return null;
        }
        return medicationScheduleDao.readyById(id);
    }

    private UserModel findSeniorById(int id){
        UserModel userSenior = userDao.readyById(id);

        if (userSenior == null){
            return null;
        }

        if (userSenior.getUserType() != UserModel.UserType.IDOSO){
            return null;
        }

        return userSenior;
    }

    @Override
    public List<MedicationSchedule> findAll() {
        return medicationScheduleDao.readAll();
    }

    @Override
    public List<MedicationSchedule> findBySeniorId(final int seniorId){

        UserModel userSenior = findSeniorById(seniorId);

        if(userSenior == null){
            return null;
        }

        return medicationScheduleDao.readyBySeniorId(seniorId);
    }

    @Override
    public boolean update(int id, MedicationSchedule medicationSchedule) {
        if (isIdInvalid(id) || medicationSchedule == null) {
            return false;
        }

        MedicationSchedule dataToUpdate = findById(id);

        if(dataToUpdate == null){
           return false;
        }


        if(medicationSchedule.getIntakeTime().isEmpty()){
            return false;
        }


        if(medicationSchedule.getDosageInstructions().isEmpty()){
            return false;
        }

        dataToUpdate.setDosageInstructions(medicationSchedule.getDosageInstructions());
        dataToUpdate.setIntakeTime(medicationSchedule.getIntakeTime());

        medicationScheduleDao.updateInformation(id,dataToUpdate);
        return true;
    }

    private boolean isIdInvalid(int id) {
        return id <= 0 ? true: false;
    }
}
