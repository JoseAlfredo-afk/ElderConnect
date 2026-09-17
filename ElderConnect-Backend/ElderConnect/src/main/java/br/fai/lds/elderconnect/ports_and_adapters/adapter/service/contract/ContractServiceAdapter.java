package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract.ContractDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.contract.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ContractServiceAdapter implements ContractService {

    @Autowired
    private ContractDao contractDao;

    @Autowired
    private UserDao userDao;

    @Override
    public int create(Contract contract) {

        if (contract == null) {
            return 0;
        }

        UserModel userSenior = findSeniorById(contract.getSeniorId());

        if (userSenior == null) {
            return 0;
        }

        UserModel userCaregiver = findCaregiverById(contract.getCaregiverId());

        if (userCaregiver == null) {
            return 0;
        }

        if (contract.getContractValue() <= 0) {
            return 0;
        }

        if (contract.getWorkingHours() == null || contract.getWorkingHours().isEmpty()) {
            return 0;
        }

        if (contract.getStartDate() == null || contract.getStartDate().isEmpty()) {
            return 0;
        }

        if (contract.getDescription() == null || contract.getDescription().isEmpty()) {
            return 0;
        }

        contract.setContractNumber(generateContractNumber());

        contract.setStatus(Contract.ContractStatus.PENDENTE);
        contract.setEndDate(null);
        contract.setRating(0);
        contract.setComment(null);

        return contractDao.add(contract);
    }

    @Override
    public void delete(int id) {

        if (isIdInvalid(id)) {
            return;
        }

        contractDao.remove(id);
    }

    @Override
    public Contract findById(int id) {

        if (isIdInvalid(id)) {
            return null;
        }

        return contractDao.readyById(id);
    }

    @Override
    public List<Contract> findAll() {
        return contractDao.readAll();
    }

    @Override
    public boolean update(int id, Contract contract) {

        if (isIdInvalid(id) || contract == null) {
            return false;
        }

        Contract dataToUpdate = findById(id);

        if (dataToUpdate == null) {
            return false;
        }

        if (contract.getContractValue() <= 0) {
            return false;
        }

        if (contract.getWorkingHours() == null || contract.getWorkingHours().isEmpty()) {
            return false;
        }

        if (contract.getDescription() == null || contract.getDescription().isEmpty()) {
            return false;
        }

        dataToUpdate.setContractValue(contract.getContractValue());
        dataToUpdate.setWorkingHours(contract.getWorkingHours());
        dataToUpdate.setDescription(contract.getDescription());

        contractDao.updateInformation(id, dataToUpdate);

        return true;
    }

    @Override
    public boolean finishContract(int id, String endDate) {

        if (isIdInvalid(id)) {
            return false;
        }

        Contract contract = contractDao.readyById(id);

        if (contract == null) {
            return false;
        }

        if (contract.getStatus() != Contract.ContractStatus.ATIVO) {
            return false;
        }

        if (endDate == null || endDate.isEmpty()) {
            return false;
        }

        return contractDao.finishContract(id, endDate);
    }

    @Override
    public boolean ratingContract(int id, int rating, String comment) {

        if (isIdInvalid(id)) {
            return false;
        }

        Contract contract = contractDao.readyById(id);

        if (contract == null) {
            return false;
        }

        if (rating <= 0 || rating > 5) {
            return false;
        }

        if (comment == null || comment.isEmpty()) {
            return false;
        }

        if (contract.getStatus() != Contract.ContractStatus.COMPLETO) {
            return false;
        }

        contract.setRating(rating);
        contract.setComment(comment);

        return contractDao.ratingContract(id, rating, comment);
    }

    @Override
    public boolean cancelContract(int id, String endDate) {

        if (isIdInvalid(id)) {
            return false;
        }

        Contract contract = contractDao.readyById(id);

        if (contract == null) {
            return false;
        }

        if (endDate == null || endDate.isEmpty()) {
            return false;
        }

        if (contract.getStatus() != Contract.ContractStatus.ATIVO && contract.getStatus() != Contract.ContractStatus.PENDENTE) {
            return false;
        }

        return contractDao.cancelContract(id, endDate);
    }

    @Override
    public List<Contract> findByCaregiverId(int caregiverId) {

        if (isIdInvalid(caregiverId)) {
            return List.of();
        }

        UserModel caregiver = findCaregiverById(caregiverId);

        if (caregiver == null) {
            return List.of();
        }

        return contractDao.readByCaregiverId(caregiverId);
    }

    @Override
    public List<Contract> findBySeniorId(int seniorId) {

        if (isIdInvalid(seniorId)) {
            return List.of();
        }

        UserModel senior = findSeniorById(seniorId);

        if (senior == null) {
            return List.of();
        }

        return contractDao.readBySeniorId(seniorId);
    }

    private String generateContractNumber() {

        return "ECCT-" + UUID.randomUUID().toString().substring(0, 15).toUpperCase();

    }

    private boolean isIdInvalid(int id) {
        return id <= 0 ? true : false;
    }

    private UserModel findCaregiverById(int id) {

        UserModel userCaregiver = userDao.readyById(id);

        if (userCaregiver == null) {
            return null;
        }

        if (userCaregiver.getUserType() != UserModel.UserType.CUIDADOR) {
            return null;
        }

        return userCaregiver;
    }

    private UserModel findSeniorById(int id) {

        UserModel userSenior = userDao.readyById(id);

        if (userSenior == null) {
            return null;
        }

        if (userSenior.getUserType() != UserModel.UserType.IDOSO) {
            return null;
        }

        return userSenior;
    }

    @Override
    public boolean activateContract(int id) {

        if (isIdInvalid(id)) {
            return false;
        }

        Contract contract = contractDao.readyById(id);

        if (contract == null) {
            return false;
        }

        if (contract.getStatus() != Contract.ContractStatus.PENDENTE) {
            return false;
        }

        return contractDao.activateContract(id);
    }
}
