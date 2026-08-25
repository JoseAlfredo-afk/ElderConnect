package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.user;

public interface UpdatePasswordService {

    boolean updatePassword(final int id, String oldPassword, String newPassword);

}
