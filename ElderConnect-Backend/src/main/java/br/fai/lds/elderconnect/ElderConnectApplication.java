
package br.fai.lds.elderconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class ElderConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElderConnectApplication.class, args);
    }
}
