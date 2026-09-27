package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.appointment;
import br.fai.lds.elderconnect.domain.Appointment;

import java.sql.Connection;
import java.util.List;

public class AppointmentPostgresDaoAdapter {


    private final Connection connection;

    public AppointmentPostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }

    public int add(Appointment entity) {
        return 0;
    }

    public void remove(int id) {

    }

    public Appointment readyById(int id) {
        return null;
    }

    public List<Appointment> readAll() {
        return null;
    }

    public List<Appointment> readyBySeniorId(int seniorId) {
        return null;
    }

    public void updateInformation(int id, Appointment entity) {

    }


}
