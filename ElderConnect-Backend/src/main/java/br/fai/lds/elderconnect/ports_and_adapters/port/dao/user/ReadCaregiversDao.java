package br.fai.lds.elderconnect.ports_and_adapters.port.dao.user;

import br.fai.lds.elderconnect.domain.UserModel;

import java.util.List;

public interface ReadCaregiversDao {

    List<UserModel> readCaregivers();
}
