package br.fai.lds.elderconnect.ports_and_adapters.port.service.common;

import java.util.List;

public interface FindBySeniorIdService<T> {

    List<T> findBySeniorId(final int seniorId);
}
