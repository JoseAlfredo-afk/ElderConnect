package br.fai.lds.elderconnect.ports_and_adapters.port.dao.message;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud.CreateDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud.ReadDao;

public interface MessageDao extends
        CreateDao<Message>,
        ReadDao<Message>,
        ReadByUserIdDao,
        ReadConversationByUsersIdsDao {
}
