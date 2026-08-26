package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.CreateUserDto;
import br.fai.lds.elderconnect.dto.CredencialUserDto;
import br.fai.lds.elderconnect.dto.UpdateFullnameDto;
import br.fai.lds.elderconnect.dto.UpdatePasswordDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserModel>> getEntities(){
        List<UserModel> entities = userService.findAll();
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getEntityById(@PathVariable final int id){
        UserModel userModel = userService.findById(id);

        return userModel == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(userModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserModel> update(@PathVariable final int id, @RequestBody final UpdateFullnameDto updateFullnameDto ){
        final UserModel userModel = updateFullnameDto.toUserModel();

        boolean response = userService.update(id, userModel);

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();

    }

    @PostMapping
    public ResponseEntity<UserModel> create(@RequestBody final CreateUserDto createUserDto) {

        UserModel userModel = createUserDto.toUserModel();

        final int id = userService.create(userModel);

        if(id == 0){
            return ResponseEntity.badRequest().build();
        }

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand(id).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/sign-in")
    public ResponseEntity<UserModel> signIn(@RequestBody CredencialUserDto credencialUserDto){

        UserModel user = userService.login(credencialUserDto.getEmail(),credencialUserDto.getPassword());

        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserModel> getEntityByEmail(@PathVariable final String email){
        final UserModel entity = userService.findByEmail(email);
        if(entity == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entity);
    }

    @PatchMapping("/update-password")
    public ResponseEntity<Void> updatePassword(@RequestBody final UpdatePasswordDto updatePasswordDto){
        final boolean response = userService.updatePassword(updatePasswordDto.getId(), updatePasswordDto.getOldPassword(), updatePasswordDto.getNewPassword());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }


}
