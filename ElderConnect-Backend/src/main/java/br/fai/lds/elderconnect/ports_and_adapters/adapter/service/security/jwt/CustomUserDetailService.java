package br.fai.lds.elderconnect.ports_and_adapters.adapter.service.security.jwt;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Profile("jwt")
@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserService userService;

    public CustomUserDetailService(UserService userService) {
        this.userService = userService;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final UserModel userModel = userService.findByEmail(username);

        if (userModel == null) {
            throw new UsernameNotFoundException("Email nao encontrado");
        }

        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority("ROLE_" + userModel.getUserType().name()));
        return new User(userModel.getEmail(), userModel.getPassword(), authorityList);
    }
}
