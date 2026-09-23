package br.fai.lds.elderconnect.dto.message;

import br.fai.lds.elderconnect.domain.Message;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMessageDto {
    private String text;
    private int senderId;
    private int recipientId;

    public Message toMessage() {

        Message message = new Message();

        message.setText(text);
        message.setSenderId(senderId);
        message.setRecipientId(recipientId);

        return message;
    }
}
