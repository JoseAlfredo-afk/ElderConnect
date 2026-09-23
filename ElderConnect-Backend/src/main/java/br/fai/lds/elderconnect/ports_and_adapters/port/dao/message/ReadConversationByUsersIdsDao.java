package br.fai.lds.elderconnect.ports_and_adapters.port.dao.message;

import br.fai.lds.elderconnect.domain.Message;

import java.util.List;

public interface ReadConversationByUsersIdsDao {

    List<Message> readConversationByUsersIds(final int user1Id, final int user2Id);

}
