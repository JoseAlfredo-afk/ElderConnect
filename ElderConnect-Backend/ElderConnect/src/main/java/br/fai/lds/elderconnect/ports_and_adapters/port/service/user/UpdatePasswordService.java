package br.fai.lds.elderconnect.ports_and_adapters.port.service.user;

public interface UpdatePasswordService {

    boolean updatePassword(final int id, String oldPassword, String newPassword);

}
