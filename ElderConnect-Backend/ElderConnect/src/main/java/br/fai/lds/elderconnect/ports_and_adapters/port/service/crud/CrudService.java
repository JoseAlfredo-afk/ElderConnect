package br.fai.lds.elderconnect.ports_and_adapters.port.service.crud;

public interface CrudService <T> extends CreateService<T>, DeleteService, UpdateService<T>, FindService<T> {

}
