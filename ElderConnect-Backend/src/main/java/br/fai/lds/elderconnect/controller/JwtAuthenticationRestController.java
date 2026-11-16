package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.user.AuthenticationDto;
import br.fai.lds.elderconnect.dto.user.UserResponseDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.rest_controllers.AuthenticationRestController;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.security.AuthenticationService;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("jwt")
@RequestMapping("/authenticate")
public class JwtAuthenticationRestController implements AuthenticationRestController {

    private final AuthenticationService authenticationService;

    public JwtAuthenticationRestController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    public ResponseEntity<UserResponseDto> authenticate(AuthenticationDto authenticationDto) {
        UserModel authenticatedUser = authenticationService.authenticate(authenticationDto.getEmail(), authenticationDto.getPassword());

        if (authenticatedUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(authenticatedUser);
    }
}
