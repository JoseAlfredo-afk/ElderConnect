package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.crud.CrudService;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.crud.FindService;

public interface UserService extends CrudService<UserModel>, FindByEmailService, UpdatePasswordService {

}
