package br.fai.lds.elderconnect.ports_and_adapters.port.rest_controllers;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.user.AuthenticationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public interface AuthenticationRestController {

    @PostMapping
    ResponseEntity<UserModel> authenticate(@RequestBody final AuthenticationDto authenticationDto);

}