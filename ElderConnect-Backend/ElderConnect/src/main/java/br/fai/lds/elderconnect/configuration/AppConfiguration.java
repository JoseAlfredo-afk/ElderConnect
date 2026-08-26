package br.fai.lds.elderconnect.configuration;

import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user.UserFakeDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user.UserPostgresDaoAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import org.apache.catalina.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfiguration {

    public UserDao getUserFakeDao(){
        return new UserFakeDaoAdapter();
    }

    @Bean
    public UserDao getUserPostgresDao(){
        return new UserPostgresDaoAdapter();
    }



}
