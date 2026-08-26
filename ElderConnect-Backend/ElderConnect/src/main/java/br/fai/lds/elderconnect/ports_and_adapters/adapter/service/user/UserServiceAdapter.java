package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceAdapter implements UserService {

    @Autowired
    private UserDao userDao;



    @Override
    public int create(UserModel userModel) {

        if(userModel == null){
            return 0;
        }

        if(isPasswordInvalid(userModel.getPassword())){
            return 0;
        }

        if(isFullnameInvalid(userModel.getFullname())){
            return 0;
        }

        if(isEmailInvalid(userModel.getEmail())){
            return 0;
        }

        if(userDao.readByEmail(userModel.getEmail()) != null){
            return 0;
        }

        if(isCpfInvalid(userModel.getCpf())){
            return 0;
        }

        if(userDao.readByCpf(userModel.getCpf()) != null){
            return 0;
        }


        if(isPhoneNumberInvalid(userModel.getPhoneNumber())){
            return 0;
        }

        if (userModel.getUserType() == null){
            return 0;
        }


        return userDao.add(userModel);
    }

    public UserModel login(String email, String password){
        if(isEmailInvalid(email)){
            return null;
        }

        if(isPasswordInvalid(password)){
            return null;
        }

        UserModel userModel = userDao.readByEmail(email);

        if(userModel == null){
            return null;
        }

        if(!userModel.getPassword().equals(password)) {
            return null;
        }

        return userModel;
    }

    @Override
    public void delete(int id) {
        if (isIdInvalid(id)) {
            return;
        }
        userDao.remove(id);
    }

    @Override
    public boolean update(int id, UserModel userModel) {
        UserModel dataToUpdate = findById(id);
        if(dataToUpdate == null) {
            return false;
        }

        dataToUpdate.setFullname(userModel.getFullname());

        userDao.updateInformation(id,dataToUpdate);
        return true;
    }

    @Override
    public UserModel findById(int id) {
        if (isIdInvalid(id)){
            return null;
        }
        return userDao.readyById(id);
    }

    @Override
    public List<UserModel> findAll() {
        return userDao.readAll();
    }

    @Override
    public UserModel findByEmail(String email) {
        if (email.isEmpty()){
            return null;
        }
        if(!email.contains("@")){
            return null;
        }

        return userDao.readByEmail(email);

    }

    @Override
    public boolean updatePassword(int id, String oldPassword, String newPassword) {
       if(isIdInvalid(id)){
           return false;
       }

       UserModel userModel = userDao.readyById(id);
       if(userModel == null){
           return false;
       }

       if(!userModel.getPassword().equals(oldPassword)){
           return false;
       }

       return userDao.updatePassword(id, newPassword);
    }

    private boolean isIdInvalid(int id) {
        return id < 0 ? true: false;
    }

    private boolean isPasswordInvalid(String password){

        if(password == null){
            return true;
        }

        if (password.isEmpty()) {
            return true;
        }
        return password.length() < 8 ? true : false;
    }

    private boolean isFullnameInvalid(String fullname){

        if(fullname == null){
            return true;
        }

        if(fullname.isEmpty()) {
            return true;
        }

        return false;
    }

    private boolean isEmailInvalid(String email){

        if(email == null){
            return true;
        }

        if(email.isEmpty()){
            return true;
        }

        if(!email.contains("@")){
            return true;
        }

        return false;
    }

    private boolean isCpfInvalid(String cpf){
        if(cpf == null){
            return true;
        }

        if(cpf.isEmpty()) {
            return true;
        }

        return false;
    }

    private boolean isPhoneNumberInvalid(String phoneNumber){
        if(phoneNumber == null){
            return true;
        }

        if(phoneNumber.isEmpty()) {
            return true;
        }

        return false;
    }
}
