package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.message;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.message.MessageDao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MessagePostgresDaoAdapter implements MessageDao {

    private final Connection connection;

    public MessagePostgresDaoAdapter(Connection connection) {
        this.connection = connection;
    }

    @Override
    public int add(Message message) {
        String sql = " INSERT INTO message(text,sent_at,sender_id,recipient_id) ";
        sql += " VALUES (?, ?, ?, ? ); ";

        PreparedStatement preparedStatement;
        ResultSet resultSet;

        try {
            connection.setAutoCommit(false);
            preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1,message.getText());
            preparedStatement.setTimestamp(2, Timestamp.valueOf(message.getSentAt()));
            preparedStatement.setInt(3,message.getSenderId());
            preparedStatement.setInt(4,message.getRecipientId());

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
    public Message readyById(int id) {
        final String sql = "SELECT * FROM message WHERE id = ?;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,id);

            ResultSet resultSet = preparedStatement.executeQuery();

            if(resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String text = resultSet.getString("text");
                final String sentAt = resultSet.getString("sent_at");
                final int senderId = resultSet.getInt("sender_id");
                final int recipientId = resultSet.getInt("recipient_id");

                final Message message = new Message();
                message.setId(entityId);
                message.setText(text);
                message.setSentAt(sentAt);
                message.setSenderId(senderId);
                message.setRecipientId(recipientId);

                preparedStatement.close();
                resultSet.close();

                return message;
            }
            return null;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Message> readAll() {
        final List<Message> messages = new ArrayList<>();
        final String sql = " SELECT * FROM message ";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String text = resultSet.getString("text");
                final String sentAt = resultSet.getString("sent_at");
                final int senderId = resultSet.getInt("sender_id");
                final int recipientId = resultSet.getInt("recipient_id");

                final Message data = new Message();
                data.setId(entityId);
                data.setText(text);
                data.setSentAt(sentAt);
                data.setSenderId(senderId);
                data.setRecipientId(recipientId);

                messages.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return messages;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Message> readByUserId(int userId) {
        final List<Message> messages = new ArrayList<>();
        String sql = " SELECT * FROM message WHERE sender_id = ? OR recipient_id = ? ";
        sql += " ORDER BY sent_at ASC;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,userId);
            preparedStatement.setInt(2,userId);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String text = resultSet.getString("text");
                final String sentAt = resultSet.getString("sent_at");
                final int senderId = resultSet.getInt("sender_id");
                final int recipientId = resultSet.getInt("recipient_id");

                final Message data = new Message();
                data.setId(entityId);
                data.setText(text);
                data.setSentAt(sentAt);
                data.setSenderId(senderId);
                data.setRecipientId(recipientId);

                messages.add(data);
            }
            preparedStatement.close();
            resultSet.close();
            return messages;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Message> readConversationByUsersIds(int user1Id, int user2Id) {
        final List<Message> conversation = new ArrayList<>();
        String sql = " SELECT * FROM message ";
        sql += " WHERE (sender_id = ? AND recipient_id = ?)";
        sql += " OR (sender_id = ? AND recipient_id = ?) ";
        sql += " ORDER BY sent_at ASC;";

        try {
            PreparedStatement preparedStatement = connection.prepareStatement(sql);

            preparedStatement.setInt(1,user1Id);
            preparedStatement.setInt(2,user2Id);

            preparedStatement.setInt(3,user2Id);
            preparedStatement.setInt(4,user1Id);

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()){
                final int entityId = resultSet.getInt("id");
                final String text = resultSet.getString("text");
                final String sentAt = resultSet.getString("sent_at");
                final int senderId = resultSet.getInt("sender_id");
                final int recipientId = resultSet.getInt("recipient_id");

                final Message data = new Message();
                data.setId(entityId);
                data.setText(text);
                data.setSentAt(sentAt);
                data.setSenderId(senderId);
                data.setRecipientId(recipientId);

                conversation.add(data);
            }

            resultSet.close();
            preparedStatement.close();
            return conversation;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
