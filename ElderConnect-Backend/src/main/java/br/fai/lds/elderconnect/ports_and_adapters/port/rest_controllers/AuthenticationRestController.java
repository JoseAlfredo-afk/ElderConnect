package br.fai.lds.elderconnect.ports_and_adapters.port.rest_controllers;

import br.fai.lds.elderconnect.dto.user.AuthenticationDto;
import br.fai.lds.elderconnect.dto.user.UserResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthenticationRestController {

    @PostMapping
    ResponseEntity<UserResponseDto> authenticate(@RequestBody final AuthenticationDto authenticationDto);

}
