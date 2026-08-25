package br.fai.lds.elderconnect.ports_and_adapters.port.dao.user;

import br.fai.lds.elderconnect.domain.UserModel;

public interface ReadByEmailDao {

    UserModel readByEmail(final String email);

}
