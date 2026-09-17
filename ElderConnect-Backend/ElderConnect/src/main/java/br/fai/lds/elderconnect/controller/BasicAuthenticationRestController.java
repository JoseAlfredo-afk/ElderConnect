package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.user.AuthenticationDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.rest_controllers.AuthenticationRestController;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.security.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/authenticate")
public class BasicAuthenticationRestController implements AuthenticationRestController {

    private final AuthenticationService authenticationService;

    public BasicAuthenticationRestController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping
    @Override
    public ResponseEntity<UserModel> authenticate(@RequestBody AuthenticationDto authenticationDto) {

        UserModel authenticatedUser = authenticationService.authenticate(authenticationDto.getEmail(), authenticationDto.getPassword());

        if (authenticatedUser == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(authenticatedUser);
    }
}
