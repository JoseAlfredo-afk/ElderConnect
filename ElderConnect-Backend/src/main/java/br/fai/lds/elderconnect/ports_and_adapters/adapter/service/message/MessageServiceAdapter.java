package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.message;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.message.MessageDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
public class MessageServiceAdapter implements MessageService {

    @Autowired
    private MessageDao messageDao;

    @Autowired
    private UserDao userDao;

    @Override
    public int create(Message message) {

        if (message == null) {
            return 0;
        }

        if (message.getText() == null || message.getText().isEmpty()) {
            return 0;
        }

        if (isIdInvalid(message.getSenderId())) {
            return 0;
        }

        if (isIdInvalid(message.getRecipientId())) {
            return 0;
        }

        if (message.getSenderId() == message.getRecipientId()) {
            return 0;
        }

        UserModel sender = userDao.readyById(message.getSenderId());

        if (sender == null) {
            return 0;
        }

        UserModel recipient = userDao.readyById(message.getRecipientId());

        if (recipient == null) {
            return 0;
        }

        message.setSentAt(generateSentAt());

        return messageDao.add(message);
    }

    @Override
    public Message findById(int id) {

        if (isIdInvalid(id)) {
            return null;
        }

        return messageDao.readyById(id);
    }

    @Override
    public List<Message> findAll() {
        return messageDao.readAll();
    }

    @Override
    public List<Message> findConversationByUsersIds(int user1Id, int user2Id) {

        if (isIdInvalid(user1Id)) {
            return List.of();
        }

        if (isIdInvalid(user2Id)) {
            return List.of();
        }

        if (user2Id == user1Id) {
            return List.of();
        }

        UserModel user1 = userDao.readyById(user1Id);

        if (user1 == null) {
            return List.of();
        }

        UserModel user2 = userDao.readyById(user2Id);

        if (user2 == null) {
            return List.of();
        }

        return messageDao.readConversationByUsersIds(user1Id, user2Id);
    }

    @Override
    public List<Message> findByUserId(int userId) {

        if (isIdInvalid(userId)) {
            return List.of();
        }

        UserModel user = userDao.readyById(userId);

        if (user == null) {
            return List.of();
        }

        return messageDao.readByUserId(userId);
    }

    private boolean isIdInvalid(int id) {
        return id <= 0 ? true : false;
    }

    private String generateSentAt() {

        LocalDateTime dateTimeNow = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        return formatter.format(dateTimeNow);
    }
}
