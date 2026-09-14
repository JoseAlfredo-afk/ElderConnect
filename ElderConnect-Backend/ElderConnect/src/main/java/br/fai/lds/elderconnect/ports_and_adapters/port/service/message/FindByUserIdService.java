package br.fai.lds.elderconnect.ports_and_adapters.port.service.message;

import br.fai.lds.elderconnect.domain.Message;

import java.util.List;

public interface FindByUserIdService {

    List<Message> findByUserId(final int userId);
}
