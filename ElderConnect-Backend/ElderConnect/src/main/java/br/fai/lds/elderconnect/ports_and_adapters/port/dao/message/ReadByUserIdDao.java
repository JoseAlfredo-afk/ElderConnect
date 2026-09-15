package br.fai.lds.elderconnect.ports_and_adapters.port.dao.message;

import br.fai.lds.elderconnect.domain.Message;

import java.util.List;

public interface ReadByUserIdDao {

    public List<Message> readByUserId(int userId);
}
