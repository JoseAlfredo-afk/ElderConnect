package br.fai.lds.elderconnect.ports_and_adapters.port.service.message;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CreateService;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.CrudService;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.crud.FindService;

public interface MessageService extends CreateService<Message>, FindService<Message>, FindConversationByUsersIdsService,FindByUserIdService {
}
