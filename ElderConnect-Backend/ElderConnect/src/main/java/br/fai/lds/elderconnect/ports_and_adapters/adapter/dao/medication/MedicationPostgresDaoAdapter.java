package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.medication;

import br.fai.lds.elderconnect.domain.Medication;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.medication.MedicationService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MedicationPostgresDaoAdapter implements MedicationDao {

    private final Connection connection;

    public MedicationPostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Medication entity) {
        String sql = " INSERT INTO medication(medication_name, dose)";
        sql += " VALUES (?, ? ); ";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1,entity.getMedicationName());
            preparedStatement.setString(2,entity.getDose());

            preparedStatement.execute();

            resultSet = preparedStatement.getGeneratedKeys();
            int id = 0;
            if (resultSet.next()){
                id = resultSet.getInt(1);
            }
            connection.commit();
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

        String sql = " DELETE FROM medication ";
        sql += "WHERE id = ? ; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);
            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Medication readyById(int id) {
        final String sql = " SELECT * FROM medication WHERE id = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String medicationName = resultSet.getString("medication_name");
                final String dose = resultSet.getString("dose");

                final Medication medication = new Medication();
                medication.setId(entityId);
                medication.setMedicationName(medicationName);
                medication.setDose(dose);

                preparedStatement.close();
                resultSet.close();

                return medication;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Medication> readAll() {
        final List<Medication> medications = new ArrayList<>();
        final String sql = " SELECT * FROM medication ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String medicationName = resultSet.getString("medication_name");
                final String dose = resultSet.getString("dose");

                final Medication data = new Medication();
                data.setId(entityId);
                data.setMedicationName(medicationName);
                data.setDose(dose);

                medications.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return medications;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void updateInformation(int id, Medication entity) {
        String sql = " UPDATE medication SET medication_name = ?, dose = ? ";
        sql += " WHERE id = ? ;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, entity.getMedicationName());
            preparedStatement.setString(2, entity.getDose());
            preparedStatement.setInt(3,entity.getId());

            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
