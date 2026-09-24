package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.Message;
import br.fai.lds.elderconnect.dto.message.CreateMessageDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.message.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/messagens")
public class MessageRestController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{id}")
    public ResponseEntity<Message> getEntityById(@PathVariable final int id) {

        Message message = messageService.findById(id);

        return message == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(message);
    }

    @GetMapping("/{user1Id}/{user2Id}")
    public ResponseEntity<List<Message>> getCoversationByUsersIds(@PathVariable final int user1Id, @PathVariable final int user2Id) {

        List<Message> messages = messageService.findConversationByUsersIds(user1Id, user2Id);

        return ResponseEntity.ok(messages);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Message>> getMessagesByUserId(@PathVariable final int userId) {

        List<Message> messages = messageService.findByUserId(userId);

        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<Message> create(@RequestBody final CreateMessageDto createMessageDto) {

        Message message = createMessageDto.toMessage();

        final int id = messageService.create(message);

        if (id == 0) {
            return ResponseEntity.badRequest().build();
        }

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand(id).toUri();

        return ResponseEntity.created(uri).build();
    }
}