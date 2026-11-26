package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.jwt.JwtTokenDto;
import br.fai.lds.elderconnect.dto.user.AuthenticationDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.security.AuthenticationService;
import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.security.jwt.JwtService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("jwt")
@RequestMapping("/authenticate")
public class JwtAuthenticationRestController {

    private final AuthenticationService authenticationService;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationRestController(
            AuthenticationService authenticationService,
            JwtService jwtService,
            UserDetailsService userDetailsService) {

        this.authenticationService = authenticationService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping
    public ResponseEntity<JwtTokenDto> authenticate(
            @RequestBody AuthenticationDto authenticationDto) {

        final UserModel authenticatedUser;

        try {
            authenticatedUser = authenticationService.authenticate(
                    authenticationDto.getEmail(),
                    authenticationDto.getPassword());

        } catch (AuthenticationException exception) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        if (authenticatedUser == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        final UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        authenticatedUser.getEmail());

        final String jwt = jwtService.generateTokenClaims(
                userDetails,
                authenticatedUser);

        if (jwt == null || jwt.isBlank()) {
            throw new IllegalStateException("Token JWT invalido");
        }

        return ResponseEntity.ok(new JwtTokenDto(jwt));
    }
}