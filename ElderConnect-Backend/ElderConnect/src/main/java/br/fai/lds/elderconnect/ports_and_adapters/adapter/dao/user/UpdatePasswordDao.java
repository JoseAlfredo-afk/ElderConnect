package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user;

public interface UpdatePasswordDao {

    boolean updatePassword(final int id, final String password);
}
