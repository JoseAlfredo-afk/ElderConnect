package br.fai.lds.elderconnect.ports_and_adapters.port.service.contract;

public interface RatingContractService {

    boolean ratingContract(int id, int rating, String comment);

}
