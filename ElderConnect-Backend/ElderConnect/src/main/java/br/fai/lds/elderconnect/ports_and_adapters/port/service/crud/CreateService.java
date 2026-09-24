package br.fai.lds.elderconnect.ports_and_adapters.port.service.crud;

public interface CreateService<T> {

    int create(final T entity);
}
