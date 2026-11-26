package br.fai.lds.elderconnect.configuration.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("jwt")
@Component
public class JwtProperties {

    @Value("${security.jwt.secret}")
    private String secret;

    @Value("${security.jwt.expiration-minutes:60}")
    private long expirationMinutes;

    public String secret() {
        return secret;
    }

    public long expirationMinutes() {
        return expirationMinutes;
    }
}