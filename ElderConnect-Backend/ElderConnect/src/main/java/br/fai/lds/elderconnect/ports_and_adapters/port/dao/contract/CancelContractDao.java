package br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract;

public interface CancelContractDao {

    public boolean cancelContract(int id, String endDate);
}
