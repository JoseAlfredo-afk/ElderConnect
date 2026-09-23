package br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract;

public interface RatingContractDao {

    boolean ratingContract(int id, int rating, String comment);

}
