package br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract;

public interface FinishContractDao {

    public boolean finishContract(int id, String endDate);
}
