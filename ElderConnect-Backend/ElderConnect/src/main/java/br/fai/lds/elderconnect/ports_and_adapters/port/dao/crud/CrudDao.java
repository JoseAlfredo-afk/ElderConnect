package br.fai.lds.elderconnect.ports_and_adapters.port.dao.crud;

public interface CrudDao<T> extends CreateDao<T>, DeleteDao, ReadDao<T>, UpdateDao<T> {
}
