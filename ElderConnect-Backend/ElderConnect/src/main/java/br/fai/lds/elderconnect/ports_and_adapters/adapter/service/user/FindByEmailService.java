package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.user;

import br.fai.lds.elderconnect.domain.UserModel;

public interface FindByEmailService {

    UserModel findByEmail(final String email);
}
