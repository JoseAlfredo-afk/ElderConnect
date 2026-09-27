package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.appointment;

import br.fai.lds.elderconnect.domain.Appointment;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.appointment.AppointmentDao;

import java.sql.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class AppointmentPostgresDaoAdapter implements AppointmentDao {

    private final Connection connection;

    public AppointmentPostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Appointment appointment) {
        String sql = " INSERT INTO appointment(date,time,title,type,responsible,notes,senior_id) ";
        sql += " VALUES (?, ?, ?, ?, ?, ?, ?); ";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setDate(1, Date.valueOf(appointment.getDate()));
            preparedStatement.setTime(2, Time.valueOf(LocalTime.parse(appointment.getTime())));
            preparedStatement.setString(3, appointment.getTitle());
            preparedStatement.setString(4, appointment.getType());
            preparedStatement.setString(5, appointment.getResponsible());
            preparedStatement.setString(6, appointment.getNotes());
            preparedStatement.setInt(7, appointment.getSeniorId());

            preparedStatement.execute();

            resultSet = preparedStatement.getGeneratedKeys();

            int id = 0;

            if (resultSet.next()) {
                id = resultSet.getInt(1);
            }

            connection.commit();
            connection.setAutoCommit(true);
            resultSet.close();
            preparedStatement.close();

            return id;
        } catch (SQLException e) {
            try {
                connection.rollback();
            } catch (SQLException ex) {
                throw new RuntimeException(ex);
            }
            throw new RuntimeException(e);
        }
    }

    @Override
    public void remove(int id) {
        String sql = "DELETE FROM appointment WHERE id = ? ; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, id);
            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Appointment readyById(int id) {
        final String sql = "SELECT * FROM appointment WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                final int entityId = resultSet.getInt("id");
                final String date = resultSet.getString("date");
                final String time = resultSet.getString("time");
                final String title = resultSet.getString("title");
                final String type = resultSet.getString("type");
                final String responsible = resultSet.getString("responsible");
                final String notes = resultSet.getString("notes");
                final int seniorId = resultSet.getInt("senior_id");

                final Appointment appointment = new Appointment();
                appointment.setId(entityId);
                appointment.setDate(date);
                appointment.setTime(time);
                appointment.setTitle(title);
                appointment.setType(type);
                appointment.setResponsible(responsible);
                appointment.setNotes(notes);
                appointment.setSeniorId(seniorId);

                preparedStatement.close();
                resultSet.close();

                return appointment;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Appointment> readAll() {

        final List<Appointment> appointments = new ArrayList<>();
        final String sql = "SELECT * FROM appointment";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                final int entityId = resultSet.getInt("id");
                final String date = resultSet.getString("date");
                final String time = resultSet.getString("time");
                final String title = resultSet.getString("title");
                final String type = resultSet.getString("type");
                final String responsible = resultSet.getString("responsible");
                final String notes = resultSet.getString("notes");
                final int seniorId = resultSet.getInt("senior_id");

                final Appointment data = new Appointment();
                data.setId(entityId);
                data.setDate(date);
                data.setTime(time);
                data.setTitle(title);
                data.setType(type);
                data.setResponsible(responsible);
                data.setNotes(notes);
                data.setSeniorId(seniorId);

                appointments.add(data);
            }

            resultSet.close();
            preparedStatement.close();

            return appointments;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, Appointment appointment) {
        String sql = "UPDATE appointment SET date = ?, time  = ?, title  = ?, type  = ?, responsible = ?, notes = ?";
        sql += "WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setDate(1, Date.valueOf(appointment.getDate()));
            preparedStatement.setTime(2, Time.valueOf(LocalTime.parse(appointment.getTime())));
            preparedStatement.setString(3, appointment.getTitle());
            preparedStatement.setString(4, appointment.getType());
            preparedStatement.setString(5, appointment.getResponsible());
            preparedStatement.setString(6, appointment.getNotes());
            preparedStatement.setInt(7, id);

            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Appointment> readBySeniorId(int seniorId) {
        final List<Appointment> appointments = new ArrayList<>();
        final String sql = "SELECT * FROM appointment WHERE senior_id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1, seniorId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                final int entityId = resultSet.getInt("id");
                final String date = resultSet.getString("date");
                final String time = resultSet.getString("time");
                final String title = resultSet.getString("title");
                final String type = resultSet.getString("type");
                final String responsible = resultSet.getString("responsible");
                final String notes = resultSet.getString("notes");
                final int Id = resultSet.getInt("senior_id");

                final Appointment data = new Appointment();
                data.setId(entityId);
                data.setDate(date);
                data.setTime(time);
                data.setTitle(title);
                data.setType(type);
                data.setResponsible(responsible);
                data.setNotes(notes);
                data.setSeniorId(seniorId);

                appointments.add(data);
            }

            resultSet.close();
            preparedStatement.close();

            return appointments;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
