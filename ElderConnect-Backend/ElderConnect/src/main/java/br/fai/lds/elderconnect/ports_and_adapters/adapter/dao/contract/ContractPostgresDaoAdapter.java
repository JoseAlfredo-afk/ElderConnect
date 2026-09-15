package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.contract;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract.ContractDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ContractPostgresDaoAdapter implements ContractDao {

    private final Connection connection;

    public ContractPostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Contract entity) {
        String sql = " INSERT INTO contract(contract_number,start_date,contract_value,status,working_hours,description,senior_id,caregiver_id) ";
        sql += " VALUES (?, ?, ?, ?, ?, ?, ?, ?); ";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {

            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, entity.getContractNumber());
            preparedStatement.setDate(2, Date.valueOf(entity.getStartDate()));
            preparedStatement.setFloat(3, entity.getContractValue());
            preparedStatement.setString(4, entity.getStatus().name());
            preparedStatement.setString(5, entity.getWorkingHours());
            preparedStatement.setString(6, entity.getDescription());
            preparedStatement.setInt(7, entity.getSeniorId());
            preparedStatement.setInt(8, entity.getCaregiverId());

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

        String sql = " DELETE FROM contract ";
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
    public Contract readyById(int id) {
        final String sql = "SELECT * FROM contract WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String contractNumber = resultSet.getString("contract_number");
                final String startDate = resultSet.getString("start_date");
                final String endDate = resultSet.getString("end_date");
                final float contractValue = resultSet.getFloat("contract_value");
                final String auxStatus = resultSet.getString("status");
                final Contract.ContractStatus contractStatus = Contract.ContractStatus.valueOf(auxStatus);
                final String workingHours = resultSet.getString("working_hours");
                final String description = resultSet.getString("description");
                final int seniorId = resultSet.getInt("senior_id");
                final int caregiverId = resultSet.getInt("caregiver_id");
                final String comment = resultSet.getString("comment");
                final int rating = resultSet.getInt("rating");

                final Contract contract = new Contract();
                contract.setId(entityId);
                contract.setContractNumber(contractNumber);
                contract.setStartDate(startDate);
                contract.setEndDate(endDate);
                contract.setContractValue(contractValue);
                contract.setStatus(contractStatus);
                contract.setWorkingHours(workingHours);
                contract.setDescription(description);
                contract.setSeniorId(seniorId);
                contract.setCaregiverId(caregiverId);
                contract.setComment(comment);
                contract.setRating(rating);

                preparedStatement.close();
                resultSet.close();

                return contract;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }

    @Override
    public List<Contract> readAll() {
        final List<Contract> contracts = new ArrayList<>();
        final String sql = " SELECT * FROM contract ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            while(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String contractNumber = resultSet.getString("contract_number");
                final String startDate = resultSet.getString("start_date");
                final String endDate = resultSet.getString("end_date");
                final float contractValue = resultSet.getFloat("contract_value");
                final String auxStatus = resultSet.getString("status");
                final Contract.ContractStatus contractStatus = Contract.ContractStatus.valueOf(auxStatus);
                final String workingHours = resultSet.getString("working_hours");
                final String description = resultSet.getString("description");
                final int seniorId = resultSet.getInt("senior_id");
                final int caregiverId = resultSet.getInt("caregiver_id");
                final String comment = resultSet.getString("comment");
                final int rating = resultSet.getInt("rating");

                final Contract data = new Contract();
                data.setId(entityId);
                data.setContractNumber(contractNumber);
                data.setStartDate(startDate);
                data.setEndDate(endDate);
                data.setContractValue(contractValue);
                data.setStatus(contractStatus);
                data.setWorkingHours(workingHours);
                data.setDescription(description);
                data.setSeniorId(seniorId);
                data.setCaregiverId(caregiverId);
                data.setComment(comment);
                data.setRating(rating);

                contracts.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return contracts;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateInformation(int id, Contract entity) {
        String sql = "UPDATE contract SET contract_value = ?, working_hours = ?, description = ? ";
        sql += "WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setFloat(1,entity.getContractValue());
            preparedStatement.setString(2, entity.getWorkingHours());
            preparedStatement.setString(3, entity.getDescription());
            preparedStatement.setInt(4,id);

            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean cancelContract(int id, String endDate) {
        String sql = "UPDATE contract SET status = ?, end_date = ? ";
        sql += "WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setString(1,Contract.ContractStatus.CANCELADO.name());
            preparedStatement.setDate(2, Date.valueOf(endDate));
            preparedStatement.setInt(3,id);

            preparedStatement.execute();
            preparedStatement.close();
            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean finishContract(int id, String endDate) {
        String sql = "UPDATE contract SET status = ?, end_date = ? ";
        sql += "WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setString(1,Contract.ContractStatus.COMPLETO.name());
            preparedStatement.setDate(2, Date.valueOf(endDate));
            preparedStatement.setInt(3,id);

            preparedStatement.execute();
            preparedStatement.close();
            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean ratingContract(int id, int rating, String comment) {
        String sql = "UPDATE contract SET rating = ?, comment = ? ";
        sql += "WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,rating);
            preparedStatement.setString(2,comment);
            preparedStatement.setInt(3,id);

            preparedStatement.execute();
            preparedStatement.close();
            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Contract> readByCaregiverId(int caregiverId) {

        final List<Contract> contracts = new ArrayList<>();
        final String sql = " SELECT * FROM contract WHERE caregiver_id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,caregiverId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String contractNumber = resultSet.getString("contract_number");
                final String startDate = resultSet.getString("start_date");
                final String endDate = resultSet.getString("end_date");
                final float contractValue = resultSet.getFloat("contract_value");
                final String auxStatus = resultSet.getString("status");
                final Contract.ContractStatus contractStatus = Contract.ContractStatus.valueOf(auxStatus);
                final String workingHours = resultSet.getString("working_hours");
                final String description = resultSet.getString("description");
                final int seniorId = resultSet.getInt("senior_id");
                final int Id = resultSet.getInt("caregiver_id");
                final String comment = resultSet.getString("comment");
                final int rating = resultSet.getInt("rating");

                final Contract data = new Contract();
                data.setId(entityId);
                data.setContractNumber(contractNumber);
                data.setStartDate(startDate);
                data.setEndDate(endDate);
                data.setContractValue(contractValue);
                data.setStatus(contractStatus);
                data.setWorkingHours(workingHours);
                data.setDescription(description);
                data.setSeniorId(seniorId);
                data.setCaregiverId(Id);
                data.setComment(comment);
                data.setRating(rating);

                contracts.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return contracts;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Contract> readBySeniorId(int seniorId) {

        final List<Contract> contracts = new ArrayList<>();
        final String sql = " SELECT * FROM contract WHERE senior_id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,seniorId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String contractNumber = resultSet.getString("contract_number");
                final String startDate = resultSet.getString("start_date");
                final String endDate = resultSet.getString("end_date");
                final float contractValue = resultSet.getFloat("contract_value");
                final String auxStatus = resultSet.getString("status");
                final Contract.ContractStatus contractStatus = Contract.ContractStatus.valueOf(auxStatus);
                final String workingHours = resultSet.getString("working_hours");
                final String description = resultSet.getString("description");
                final int Id = resultSet.getInt("senior_id");
                final int caregiverId = resultSet.getInt("caregiver_id");final String comment = resultSet.getString("comment");
                final int rating = resultSet.getInt("rating");

                final Contract data = new Contract();
                data.setId(entityId);
                data.setContractNumber(contractNumber);
                data.setStartDate(startDate);
                data.setEndDate(endDate);
                data.setContractValue(contractValue);
                data.setStatus(contractStatus);
                data.setWorkingHours(workingHours);
                data.setDescription(description);
                data.setSeniorId(Id);
                data.setCaregiverId(caregiverId);
                data.setComment(comment);
                data.setRating(rating);

                contracts.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return contracts;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public boolean activateContract(int id) {
        String sql = " UPDATE contract SET status = ?";
        sql += " WHERE id = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setString(1,Contract.ContractStatus.ATIVO.name());
            preparedStatement.setInt(2,id);

            preparedStatement.execute();
            preparedStatement.close();
            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
