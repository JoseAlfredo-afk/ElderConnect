package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.medication;

import br.fai.lds.elderconnect.domain.MedicationSchedule;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationScheduleDao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class MedicationSchedulePostgresDaoAdapter implements MedicationScheduleDao {

    private final Connection connection;

    public MedicationSchedulePostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }


    @Override
    public int add(MedicationSchedule entity) {
        String sql = " INSERT INTO medication_schedule(dosage_instructions,intake_time,senior_id,medication_id)";
        sql += " VALUES (?, ?, ?, ? ); ";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1,entity.getDosageInstructions());
            preparedStatement.setString(2,entity.getIntakeTime());
            preparedStatement.setInt(3,entity.getSeniorId());
            preparedStatement.setInt(4,entity.getMedicationId());

            preparedStatement.execute();

            resultSet = preparedStatement.getGeneratedKeys();
            int id = 0;

            if (resultSet.next()) {
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

        String sql = "DELETE FROM medication_schedule";
        sql += " WHERE id = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);
            preparedStatement.execute();
            preparedStatement.close();
            ;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public MedicationSchedule readyById(int id) {
        final String sql = "SELECT * FROM medication_schedule WHERE id = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                final int entityId = resultSet.getInt("id");
                final String dosageInstructions = resultSet.getString("dosageInstructions");
                final String intakeTime = resultSet.getString("intake_time");
                final int seniorId = resultSet.getInt("senior_id");
                final int medicationId = resultSet.getInt("medication_id");

                final MedicationSchedule medicationSchedule = new MedicationSchedule();
                medicationSchedule.setId(entityId);
                medicationSchedule.setDosageInstructions(dosageInstructions);
                medicationSchedule.setIntakeTime(intakeTime);
                medicationSchedule.setSeniorId(seniorId);
                medicationSchedule.setMedicationId(medicationId);

                preparedStatement.close();
                resultSet.close();

                return medicationSchedule;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<MedicationSchedule> readAll() {
       final List<MedicationSchedule> medicationSchedules = new ArrayList<>();
       final String sql = "SELECT * FROM medication_schedule ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();


            while (resultSet.next()) {
                final int entityId = resultSet.getInt("id");
                final String dosageInstructions = resultSet.getString("dosageInstructions");
                final String intakeTime = resultSet.getString("intake_time");
                final int seniorId = resultSet.getInt("senior_id");
                final int medicationId = resultSet.getInt("medication_id");

                final MedicationSchedule data = new MedicationSchedule();
                data.setId(entityId);
                data.setDosageInstructions(dosageInstructions);
                data.setIntakeTime(intakeTime);
                data.setSeniorId(seniorId);
                data.setMedicationId(medicationId);

                medicationSchedules.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return medicationSchedules;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void updateInformation(int id, MedicationSchedule entity) {
        String sql = " UPDATE medication_schedule set dosage_instructions = ?, intake_time = ? ";
        sql += " WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, entity.getDosageInstructions());
            preparedStatement.setString(2, entity.getIntakeTime());
            preparedStatement.setInt(3,entity.getId());

            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<MedicationSchedule> readyBySeniorId(int seniorId) {
        final List<MedicationSchedule> medicationSchedulesBySeniorId = new ArrayList<>();

        final String sql = "SELECT * FROM medication_schudule WHERE senior_id = ? ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                final int entityId = resultSet.getInt("id");
                final String dosageInstructions = resultSet.getString("dosageInstructions");
                final String intakeTime = resultSet.getString("intake_time");
                final int medicationId = resultSet.getInt("medication_id");

                final MedicationSchedule data = new MedicationSchedule();
                data.setId(entityId);
                data.setDosageInstructions(dosageInstructions);
                data.setIntakeTime(intakeTime);
                data.setSeniorId(seniorId);
                data.setMedicationId(medicationId);

                medicationSchedulesBySeniorId.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return medicationSchedulesBySeniorId;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }
}
