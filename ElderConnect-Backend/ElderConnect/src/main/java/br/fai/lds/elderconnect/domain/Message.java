package br.fai.lds.elderconnect.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message {
    private int id;
    private String text;
    private String sentAt;
    private int senderId;
    private int recipientId;
}
