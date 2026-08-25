package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.crud;

public interface CreateService<T> {

    int create(final T entity);
}
