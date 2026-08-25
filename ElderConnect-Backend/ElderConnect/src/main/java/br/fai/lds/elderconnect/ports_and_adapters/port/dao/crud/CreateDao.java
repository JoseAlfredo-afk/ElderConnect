package br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud;

public interface CreateDao<T> {

    int add(final T entity);
}
