package br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract;

import br.fai.lds.elderconnect.domain.Contract;

import java.util.List;

public interface ReadBySeniorIdDao {

    public List<Contract> readBySeniorId(int seniorId);

}
