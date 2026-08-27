package br.fai.lds.elderconnect.ports_and_adapters.port.service.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CrudService;

public interface UserService extends CrudService<UserModel>, FindByEmailService, UpdatePasswordService, UpdateEmailService, LoginService {

}
