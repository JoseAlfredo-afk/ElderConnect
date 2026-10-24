package br.fai.lds.elderconnect.domain;

import br.fai.lds.elderconnect.ports_and_adapters.adapter.service.user.UserServiceAdapter;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.never;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)

public class UserServiceAdapterTest {


    @Mock
    private UserDao userDao;

    @InjectMocks
    private UserServiceAdapter userService;

    @Test
    void deveCriarUsuarioComDadosValidos() {
        UserModel user = new UserModel();
        user.setCpf("12345678900");
        user.setFullname("Maria da Silva");
        user.setEmail("maria@email.com");
        user.setPassword("senha123");
        user.setPhoneNumber("35999999999");
        user.setUserType(UserModel.UserType.IDOSO);

        when(userDao.readByEmail(user.getEmail())).thenReturn(null);
        when(userDao.readByCpf(user.getCpf())).thenReturn(null);
        when(userDao.add(user)).thenReturn(1);

        int resultado = userService.create(user);

        assertEquals(1, resultado);
        verify(userDao).add(user);
    }

    @Test
    void naoDeveCriarUsuarioComSenhaInvalida() {
        UserModel user = new UserModel();
        user.setPassword("123");

        int resultado = userService.create(user);

        assertEquals(0, resultado);
        verifyNoInteractions(userDao);
    }

    @Test
    void naoDeveCriarUsuarioComEmailDuplicado() {
        UserModel user = new UserModel();
        user.setCpf("12345678900");
        user.setFullname("Maria da Silva");
        user.setEmail("maria@email.com");
        user.setPassword("senha123");
        user.setPhoneNumber("35999999999");
        user.setUserType(UserModel.UserType.IDOSO);

        UserModel usuarioExistente = new UserModel();
        when(userDao.readByEmail(user.getEmail()))
                .thenReturn(usuarioExistente);

        int resultado = userService.create(user);

        assertEquals(0, resultado);
        verify(userDao, never()).add(any(UserModel.class));
    }
}
