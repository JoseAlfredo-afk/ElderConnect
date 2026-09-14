package br.fai.lds.elderconnect.ports_and_adapters.port.service.message;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CrudService;

public interface MessageService extends CrudService<Message>, FindConversationByUsersIdsService,FindByUserIdService {
}
