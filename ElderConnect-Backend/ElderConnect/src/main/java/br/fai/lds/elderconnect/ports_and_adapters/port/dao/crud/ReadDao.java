package br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud;

import java.util.List;

public interface ReadDao<T> {

    T readyById(final int id);

    List<T> readAll();
}
