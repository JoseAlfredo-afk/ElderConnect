package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.crud;

public interface UpdateService<T> {

    boolean update(final int id, final T entity);

}
