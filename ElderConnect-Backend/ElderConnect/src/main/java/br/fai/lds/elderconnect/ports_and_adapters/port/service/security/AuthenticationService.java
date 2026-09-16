package br.fai.lds.elderconnect.ports_and_adapters.port.service.security;

import br.fai.lds.elderconnect.domain.UserModel;

public interface AuthenticationService {

    UserModel authenticate(final String email, final String password);
}
