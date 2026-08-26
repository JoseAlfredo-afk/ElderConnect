package br.fai.lds.elderconnect.ports_and_adapters.port.service.user;

import br.fai.lds.elderconnect.domain.UserModel;

public interface LoginService {

    UserModel login(String email, String password);
}
