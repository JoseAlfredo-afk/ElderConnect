package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;

import java.util.List;

public class UserPostgresDaoAdapter implements UserDao {
    @Override
    public int add(UserModel entity) {
        return 0;
    }

    @Override
    public void remove(int id) {

    }

    @Override
    public UserModel readyById(int id) {
        return null;
    }

    @Override
    public List<UserModel> readAll() {
        return List.of();
    }

    @Override
    public void updateInformation(int id, UserModel entity) {

    }

    @Override
    public UserModel readByEmail(String email) {
        return null;
    }

    @Override
    public boolean updatePassword(int id, String password) {
        return false;
    }

    @Override
    public UserModel readByCpf(String cpf) {
        return null;
    }
}
