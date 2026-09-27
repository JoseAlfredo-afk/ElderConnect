package br.fai.lds.elderconnect.controller;


import br.fai.lds.elderconnect.domain.Appointment;
import br.fai.lds.elderconnect.dto.appointment.CreateAppointmentDto;
import br.fai.lds.elderconnect.dto.appointment.UpdateAppointmentDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.appointment.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/appointments")
public class AppointmentRestController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<List<Appointment>> getEntities() {

        List<Appointment> appointments = appointmentService.findAll();

        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getEntityById(@PathVariable final int id) {

        Appointment appointment = appointmentService.findById(id);

        return appointment == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(appointment);
    }

    @GetMapping("senior/{seniorId}")
    public ResponseEntity<List<Appointment>> getEntitiesBySeniorId(@PathVariable final int seniorId) {

        List<Appointment> appointments = appointmentService.findBySeniorId(seniorId);

        return ResponseEntity.ok(appointments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id) {

        appointmentService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Appointment> create(@RequestBody final CreateAppointmentDto createAppointmentDto) {

        Appointment appointment = createAppointmentDto.toAppointment();

        final int id = appointmentService.create(appointment);

        if (id == 0) {
            return ResponseEntity.badRequest().build();
        }

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand(id).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> update(@PathVariable final int id, @RequestBody final UpdateAppointmentDto updateAppointmentDto) {

        final Appointment appointment = updateAppointmentDto.toAppointment();

        boolean response = appointmentService.update(id, appointment);

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

}
