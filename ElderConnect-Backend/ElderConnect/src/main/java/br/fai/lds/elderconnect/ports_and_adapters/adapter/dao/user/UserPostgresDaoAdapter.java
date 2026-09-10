package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import org.springframework.context.annotation.Bean;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class UserPostgresDaoAdapter implements UserDao {

    private final Connection connection;

    public UserPostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(UserModel entity) {

        String sql = " INSERT INTO user_model(cpf, fullname, email, password, phone_number, user_type,birth_date)";
        sql += " VALUES (?, ?, ?, ?, ?, ?, ? ); ";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);

            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1,entity.getCpf());
            preparedStatement.setString(2,entity.getFullname());
            preparedStatement.setString(3,entity.getEmail());
            preparedStatement.setString(4,entity.getPassword());
            preparedStatement.setString(5,entity.getPhoneNumber());
            preparedStatement.setString(6,entity.getUserType().name());
            preparedStatement.setDate(7, Date.valueOf(entity.getBirthDate()));

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

        String sql = " DELETE FROM user_model ";
        sql += " WHERE id = ? ; ";

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
    public UserModel readyById(int id) {

        final String sql = " SELECT * FROM user_model WHERE id = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String cpf = resultSet.getString("cpf");
                final String fullname = resultSet.getString("fullname");
                final String email = resultSet.getString("email");
                final String password = resultSet.getString("password");
                final String phoneNumber = resultSet.getString("phone_number");
                final String auxType = resultSet.getString("user_type");
                final UserModel.UserType userType = UserModel.UserType.valueOf(auxType);
                final String birthDate = resultSet.getString("birth_date");
                final String availabilitySchedule = resultSet.getString("availability_schedule");
                final String streetAddress = resultSet.getString("street_address");
                final String specialization = resultSet.getString("specialization");
                final String city = resultSet.getString("city");
                final String neighborhood = resultSet.getString("neighborhood");
                final String experience = resultSet.getString("experience");

                final UserModel userModel = new UserModel();
                userModel.setId(entityId);
                userModel.setCpf(cpf);
                userModel.setFullname(fullname);
                userModel.setEmail(email);
                userModel.setPassword(password);
                userModel.setPhoneNumber(phoneNumber);
                userModel.setUserType(userType);
                userModel.setBirthDate(birthDate);
                userModel.setAvailabilitySchedule(availabilitySchedule);
                userModel.setStreetAddress(streetAddress);
                userModel.setSpecialization(specialization);
                userModel.setCity(city);
                userModel.setNeighborhood(neighborhood);
                userModel.setExperience(experience);

                preparedStatement.close();
                resultSet.close();

                return userModel;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<UserModel> readAll() {
        final List<UserModel> userModels = new ArrayList<>();
        final String sql = " SELECT * FROM user_model ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String cpf = resultSet.getString("cpf");
                final String fullname = resultSet.getString("fullname");
                final String email = resultSet.getString("email");
                final String password = resultSet.getString("password");
                final String phoneNumber = resultSet.getString("phone_number");
                final String auxType = resultSet.getString("user_type");
                final UserModel.UserType userType = UserModel.UserType.valueOf(auxType);
                final String birthDate = resultSet.getString("birth_date");
                final String availabilitySchedule = resultSet.getString("availability_schedule");
                final String streetAddress = resultSet.getString("street_address");
                final String specialization = resultSet.getString("specialization");
                final String city = resultSet.getString("city");
                final String neighborhood = resultSet.getString("neighborhood");
                final String experience = resultSet.getString("experience");


                final UserModel data = new UserModel();
                data.setId(entityId);
                data.setCpf(cpf);
                data.setFullname(fullname);
                data.setEmail(email);
                data.setPassword(password);
                data.setPhoneNumber(phoneNumber);
                data.setUserType(userType);
                data.setBirthDate(birthDate);
                data.setAvailabilitySchedule(availabilitySchedule);
                data.setStreetAddress(streetAddress);
                data.setSpecialization(specialization);
                data.setCity(city);
                data.setNeighborhood(neighborhood);
                data.setExperience(experience);

                userModels.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return userModels;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public void updateInformation(int id, UserModel entity) {
        String sql = " UPDATE user_model SET fullname = ?, phone_number = ? ";
        sql += " WHERE id = ? ;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1, entity.getFullname());
            preparedStatement.setString(2, entity.getPhoneNumber());
            preparedStatement.setInt(3, entity.getId());

            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public UserModel readByEmail(String email) {
        final String sql = " SELECT * FROM user_model WHERE email = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1,email);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String cpf = resultSet.getString("cpf");
                final String fullname = resultSet.getString("fullname");
                final String password = resultSet.getString("password");
                final String phoneNumber = resultSet.getString("phone_number");
                final String auxType = resultSet.getString("user_type");
                final UserModel.UserType userType = UserModel.UserType.valueOf(auxType);
                final String birthDate = resultSet.getString("birth_date");
                final String availabilitySchedule = resultSet.getString("availability_schedule");
                final String streetAddress = resultSet.getString("street_address");
                final String specialization = resultSet.getString("specialization");
                final String city = resultSet.getString("city");
                final String neighborhood = resultSet.getString("neighborhood");
                final String experience = resultSet.getString("experience");


                final UserModel userModel = new UserModel();
                userModel.setId(entityId);
                userModel.setCpf(cpf);
                userModel.setFullname(fullname);
                userModel.setEmail(email);
                userModel.setPassword(password);
                userModel.setPhoneNumber(phoneNumber);
                userModel.setUserType(userType);
                userModel.setBirthDate(birthDate);
                userModel.setAvailabilitySchedule(availabilitySchedule);
                userModel.setStreetAddress(streetAddress);
                userModel.setSpecialization(specialization);
                userModel.setCity(city);
                userModel.setNeighborhood(neighborhood);
                userModel.setExperience(experience);

                preparedStatement.close();
                resultSet.close();

                return userModel;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public UserModel readByCpf(String cpf) {
        final String sql = " SELECT * FROM user_model WHERE cpf = ?; ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1,cpf);

            ResultSet resultSet = preparedStatement.executeQuery();

            if (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String fullname = resultSet.getString("fullname");
                final String email = resultSet.getString("email");
                final String password = resultSet.getString("password");
                final String phoneNumber = resultSet.getString("phone_number");
                final String auxType = resultSet.getString("user_type");
                final UserModel.UserType userType = UserModel.UserType.valueOf(auxType);
                final String birthDate = resultSet.getString("birth_date");
                final String availabilitySchedule = resultSet.getString("availability_schedule");
                final String streetAddress = resultSet.getString("street_address");
                final String specialization = resultSet.getString("specialization");
                final String city = resultSet.getString("city");
                final String neighborhood = resultSet.getString("neighborhood");
                final String experience = resultSet.getString("experience");


                final UserModel userModel = new UserModel();
                userModel.setId(entityId);
                userModel.setCpf(cpf);
                userModel.setFullname(fullname);
                userModel.setEmail(email);
                userModel.setPassword(password);
                userModel.setPhoneNumber(phoneNumber);
                userModel.setUserType(userType);
                userModel.setBirthDate(birthDate);
                userModel.setAvailabilitySchedule(availabilitySchedule);
                userModel.setStreetAddress(streetAddress);
                userModel.setSpecialization(specialization);
                userModel.setCity(city);
                userModel.setNeighborhood(neighborhood);
                userModel.setExperience(experience);

                preparedStatement.close();
                resultSet.close();

                return userModel;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public boolean updatePassword(int id, String password) {
        String sql = " UPDATE user_model SET password = ? ";
        sql += " WHERE id = ? ;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1,password);
            preparedStatement.setInt(2,id);

            preparedStatement.execute();
            preparedStatement.close();

            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }



    @Override
    public boolean updateEmail(int id, String email) {
        String sql = " UPDATE user_model SET email = ? ";
        sql += " WHERE id = ? ;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setString(1,email);
            preparedStatement.setInt(2,id);

            preparedStatement.execute();
            preparedStatement.close();

            return true;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
