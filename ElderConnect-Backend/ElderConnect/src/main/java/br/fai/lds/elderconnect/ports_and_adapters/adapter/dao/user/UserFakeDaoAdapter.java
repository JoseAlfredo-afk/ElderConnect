package br.fai.lds.elderconnect.ports_and_adapters.adapter.dao.user;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.domain.UserType;
import br.fai.lds.elderconnect.ports_and_adapters.port.dao.user.UserDao;

import java.util.ArrayList;
import java.util.List;

public class UserFakeDaoAdapter implements UserDao {

    private static final List<UserModel> entities = new ArrayList<>();
    private static int ID = 0;

    public UserFakeDaoAdapter(){
        UserModel senior1 = new UserModel();
        senior1.setId(getNextID());
        senior1.setCpf("111.111.111-11");
        senior1.setFullname("Maria de Olinda");
        senior1.setEmail("maria@email.com");
        senior1.setPassword("12345678");
        senior1.setPhoneNumber("(35) 99191-9191");
        senior1.setUserType(UserType.IDOSO);
        senior1.setBirthDate("21/04/1938");

        UserModel senior2 = new UserModel();
        senior2.setId(getNextID());
        senior2.setCpf("222.222.222-22");
        senior2.setFullname("João Silva");
        senior2.setEmail("joao@email.com");
        senior2.setPassword("23456788");
        senior2.setPhoneNumber("(35) 99999-9999");
        senior2.setUserType(UserType.IDOSO);
        senior2.setBirthDate("27/06/1945");

        UserModel caregiver1 = new UserModel();
        caregiver1.setId(getNextID());
        caregiver1.setCpf("333.333.333-33");
        caregiver1.setFullname("Juliana Mota");
        caregiver1.setEmail("juliana@email.com");
        caregiver1.setPassword("juju2108");
        caregiver1.setPhoneNumber("(35) 99193-9393");
        caregiver1.setUserType(UserType.CUIDADOR);
        caregiver1.setAvailabilitySchedule("Segunda a sexta - 08:00 às 18:00");
        caregiver1.setStreetAddress("Rua das Flores, 120");
        caregiver1.setSpecialization("Cuidados gerais com idosos");
        caregiver1.setCity("Santa Rita do Sapucaí");
        caregiver1.setNeighborhood("Centro");
        caregiver1.setExperience("5 anos de experiência com cuidados domiciliares");

        UserModel caregiver2 = new UserModel();
        caregiver2.setId(getNextID());
        caregiver2.setCpf("444.444.444-44");
        caregiver2.setFullname("Paulo Santos");
        caregiver2.setEmail("paulo@email.com");
        caregiver2.setPassword("03456777");
        caregiver2.setPhoneNumber("(35) 94444-5555");
        caregiver2.setUserType(UserType.CUIDADOR);
        caregiver2.setAvailabilitySchedule("Todos os dias - 18:00 às 06:00");
        caregiver2.setStreetAddress("Avenida Sapucaí, 450");
        caregiver2.setSpecialization("Cuidados noturnos");
        caregiver2.setCity("Santa Rita do Sapucaí");
        caregiver2.setNeighborhood("Boa Vista");
        caregiver2.setExperience("3 anos trabalhando como cuidador noturno");


        UserModel caregiver3 = new UserModel();
        caregiver3.setId(getNextID());
        caregiver3.setCpf("111.111.111-55");
        caregiver3.setFullname("Larissa Silva");
        caregiver3.setEmail("larissa@email.com");
        caregiver3.setPassword("52345564");
        caregiver3.setPhoneNumber("(35) 99595-9595");
        caregiver3.setUserType(UserType.CUIDADOR);
        caregiver3.setAvailabilitySchedule("Segunda, quarta e sexta - 07:00 às 17:00");
        caregiver3.setStreetAddress("Rua José Pinto, 81");
        caregiver3.setSpecialization("Acompanhamento e administração de medicamentos");
        caregiver3.setCity("Pouso Alegre");
        caregiver3.setNeighborhood("São Carlos");
        caregiver3.setExperience("8 anos de experiência no acompanhamento de idosos");

        entities.add(senior1);
        entities.add(senior2);
        entities.add(caregiver1);
        entities.add(caregiver2);
        entities.add(caregiver3);

    }

    private int getNextID(){
        ID += 1;
        return ID;
    }

    @Override
    public int add(UserModel entity) {
        final int id = getNextID();
        entity.setId(id);
        entities.add(entity);
        return id;
    }
    @Override
    public void remove(int id) {
        int itemIndex = -1;

        for (int i = 0; i < entities.size(); i++) {
            final UserModel entity = entities.get(i);
            if (entity.getId() == id){
                itemIndex = i;
                break;
            }
        }

        if(itemIndex == -1){
            return;
        }

        UserModel removedData = entities.remove(itemIndex);
        System.out.println("A entidade " + removedData.getFullname() + "foi removida com sucesso.");
    }

    @Override
    public UserModel readyById(int id) {
        for (UserModel entity : entities){
            if (entity.getId() == id){
                return entity;
            }
        }
        return null;
    }

    @Override
    public List<UserModel> readAll() {
        return entities;
    }

    @Override
    public void updateInformation(int id, UserModel entity) {
        for(UserModel data : entities){
            if(data.getId() == id){
                data.setFullname(entity.getFullname());
                data.setEmail(entity.getEmail());
                break;
            }
        }
    }

    @Override
    public UserModel readByEmail(String email) {
        for (UserModel entity : entities){
            if(entity.getEmail().equalsIgnoreCase(email)){
                return entity;
            }
        }
        return null;
    }

    public UserModel readByCpf(String cpf) {
        for (UserModel entity : entities){
            if(entity.getCpf().equals(cpf)){
                return entity;
            }
        }
        return null;
    }

    @Override
    public boolean updatePassword(int id, String password) {
        boolean response = false;

        for(UserModel entity : entities){
            if(entity.getId() == id){
                entity.setPassword(password);
                response = true;
                break;
            }
        }
        return response;
    }
}
