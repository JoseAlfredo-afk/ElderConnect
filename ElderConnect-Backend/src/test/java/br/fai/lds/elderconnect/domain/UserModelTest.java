package br.fai.lds.elderconnect.domain;

import org.junit.Test;
import static org.junit.Assert.*;

public class UserModelTest {

    @Test
    public void shouldCreateUserAndSetValuesCorrectly() {

        UserModel user = new UserModel();

        user.setId(1);
        user.setFullname("Maria Silva");
        user.setCpf("123.456.789-00");
        user.setEmail("maria@email.com");
        user.setPassword("senha123");
        user.setUserType(UserModel.UserType.CUIDADOR);
        user.setHourlyRate(45.50f);
        user.setExperienceYears(5);

        assertEquals(1, user.getId());
        assertEquals("Maria Silva", user.getFullname());
        assertEquals("123.456.789-00", user.getCpf());
        assertEquals("maria@email.com", user.getEmail());
        assertEquals("senha123", user.getPassword());
        assertEquals(UserModel.UserType.CUIDADOR, user.getUserType());
        assertEquals(Float.valueOf(45.50f), user.getHourlyRate());
        assertEquals(Integer.valueOf(5), user.getExperienceYears());
    }

    @Test
    public void shouldValidateUserTypeEnumValues() {
        assertEquals(2, UserModel.UserType.values().length);
        assertEquals(UserModel.UserType.IDOSO, UserModel.UserType.valueOf("IDOSO"));
        assertEquals(UserModel.UserType.CUIDADOR, UserModel.UserType.valueOf("CUIDADOR"));
    }
}