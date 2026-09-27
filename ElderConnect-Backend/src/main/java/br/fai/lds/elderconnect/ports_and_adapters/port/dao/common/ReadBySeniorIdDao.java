package br.fai.lds.elderconnect.ports_and_adapters.port.dao.common;

import java.util.List;

public interface ReadBySeniorIdDao<T> {

    List<T> readBySeniorIdDao(int seniorId);

}
