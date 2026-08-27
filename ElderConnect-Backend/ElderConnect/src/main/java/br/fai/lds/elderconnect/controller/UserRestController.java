package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.*;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
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
    public ResponseEntity<UserResponseDto> getEntityById(@PathVariable final int id){
        UserModel userModel = userService.findById(id);

        return userModel == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(UserResponseDto.toUserModel(userModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<UserModel> updateProfile(@PathVariable final int id, @RequestBody final UpdateProfileDto updateProfileDto){
        final UserModel userModel = updateProfileDto.toUserModel();

        boolean response = userService.updateProfile(id, userModel);

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
    public ResponseEntity<UserResponseDto> signIn(@RequestBody CredencialUserDto credencialUserDto){

        UserModel user = userService.login(credencialUserDto.getEmail(),credencialUserDto.getPassword());

        if(user == null){
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(UserResponseDto.toUserModel(user));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserResponseDto> getEntityByEmail(@PathVariable final String email){
        final UserModel entity = userService.findByEmail(email);
        if(entity == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(UserResponseDto.toUserModel(entity));
    }

    @PatchMapping("/update-password")
    public ResponseEntity<Void> updatePassword(@RequestBody final UpdatePasswordDto updatePasswordDto){
        final boolean response = userService.updatePassword(updatePasswordDto.getId(), updatePasswordDto.getOldPassword(), updatePasswordDto.getNewPassword());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("/update-email")
    public ResponseEntity<Void> updateEmail(@RequestBody final UpdateEmailDto updateEmailDto) {

        final boolean response = userService.updateEmail(updateEmailDto.getId(),updateEmailDto.getPassword(), updateEmailDto.getNewEmail());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }


}
