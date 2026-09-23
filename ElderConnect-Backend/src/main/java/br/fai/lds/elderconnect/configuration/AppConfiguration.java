package br.fai.lds.elderconnect.configuration;

import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.contract.ContractPostgresDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.medication.MedicationPostgresDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.medication.MedicationSchedulePostgresDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.message.MessagePostgresDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user.UserFakeDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user.UserPostgresDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.security.BasicAuthenticationServiceAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.contract.ContractDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.medication.MedicationScheduleDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.message.MessageDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.security.AuthenticationService;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;

import java.sql.Connection;
import java.util.Arrays;

@Configuration
public class AppConfiguration {

    private final Environment environment;

    public AppConfiguration(Environment environment) {
        this.environment = environment;
        System.out.println("--------------------");
        System.out.println("active profile: " + Arrays.toString(environment.getActiveProfiles()));
        System.out.println("--------------------");
    }

    public UserDao getUserFakeDao() {
        return new UserFakeDaoAdapter();
    }

    @Bean
    public UserDao getUserPostgresDao(final Connection connection) {
        return new UserPostgresDaoAdapter(connection);
    }

    @Bean
    public MedicationDao getMedicationDao(final Connection connection) {
        return new MedicationPostgresDaoAdapter(connection);
    }

    @Bean
    public MedicationScheduleDao getMedicationScheduleDao(final Connection connection) {
        return new MedicationSchedulePostgresDaoAdapter(connection);
    }

    @Bean
    public ContractDao getContractDao(final Connection connection) {
        return new ContractPostgresDaoAdapter(connection);
    }

    @Bean
    public MessageDao getMessageDao(final Connection connection) {
        return new MessagePostgresDaoAdapter(connection);
    }

    @Profile("basic")
    @Bean
    public AuthenticationService basicAuthenticationService(final UserService userService) {
        return new BasicAuthenticationServiceAdapter(userService);
    }

}
