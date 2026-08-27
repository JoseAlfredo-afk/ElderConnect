package br.fai.lds.elderconnect.ports_and_adapters.port.service.crud;

public interface UpdateService<T> {

    boolean updateProfile(final int id, final T entity);

}
