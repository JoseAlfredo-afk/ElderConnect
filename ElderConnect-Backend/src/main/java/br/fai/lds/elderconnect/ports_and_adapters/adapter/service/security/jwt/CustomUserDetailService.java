package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.security.jwt;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Profile("jwt")
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserService userService;

    public CustomUserDetailService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        final UserModel userModel = userService.findByEmail(email);

        if (userModel == null) {
            throw new UsernameNotFoundException(
                    "Usuario nao encontrado: " + email);
        }

        return User.withUsername(userModel.getEmail())
                .password(userModel.getPassword())
                .authorities(userModel.getUserType().name())
                .build();
    }
}