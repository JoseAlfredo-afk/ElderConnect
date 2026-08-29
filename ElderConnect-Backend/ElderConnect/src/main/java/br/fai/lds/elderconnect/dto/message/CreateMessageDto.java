package br.fai.lds.elderconnect.dto.message;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.domain.UserModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMessageDto {
    private String text;
    private String sentAt;
    private int senderId;
    private int recipientId;

    public Message toMessage(){
        Message message = new Message();
        message.setText(text);
        message.setSenderId(senderId);
        message.setRecipientId(recipientId);
        return message;
    }
}
