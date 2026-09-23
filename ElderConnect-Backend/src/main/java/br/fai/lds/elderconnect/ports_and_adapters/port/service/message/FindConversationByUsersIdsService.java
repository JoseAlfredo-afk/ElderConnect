package br.fai.lds.elderconnect.ports_and_adapters.port.service.message;

import br.fai.lds.elderconnect.domain.Message;

import java.util.List;

public interface FindConversationByUsersIdsService {

    List<Message> findConversationByUsersIds(final int user1Id, final int user2Id);

}
