package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.crud;

public interface UpdateDao<T> {

    void updateInformation(final int id, final T entity);
}
