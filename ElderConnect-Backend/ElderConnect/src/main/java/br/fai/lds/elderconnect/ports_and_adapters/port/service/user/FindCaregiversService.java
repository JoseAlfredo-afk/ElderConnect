package br.fai.lds.elderconnect.ports_and_adapters.port.service.user;

import br.fai.lds.elderconnect.domain.UserModel;

import java.util.List;


public interface FindCaregiversService {

    List<UserModel> findCaregivers();

}
