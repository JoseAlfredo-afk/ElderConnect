package br.fai.lds.elderconnect.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Medication {
    private int id;
    private String medicationName;
    private String dose;

}
