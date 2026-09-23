package br.fai.lds.elderconnect.ports_and_adapters.port.service.user;

public interface UpdateEmailService {

    boolean updateEmail(final int id, String password, String newEmail);

}
