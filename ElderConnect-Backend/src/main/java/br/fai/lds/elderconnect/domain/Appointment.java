package br.fai.lds.elderconnect.domain;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Appointment {
    private int id;
    private String date;
    private String time;
    private String title;
    private String type;
    private String responsible;
    private String notes;
    private int seniorId;
}
