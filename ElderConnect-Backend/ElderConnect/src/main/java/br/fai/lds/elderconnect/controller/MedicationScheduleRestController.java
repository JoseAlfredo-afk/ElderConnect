package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.MedicationSchedule;
import br.fai.lds.elderconnect.dto.medicationschedule.CreateMedicationScheduleDto;
import br.fai.lds.elderconnect.dto.medicationschedule.UpdateMedicationScheduleDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.medication.MedicationScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.awt.*;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/schedule-medications/")
public class MedicationScheduleRestController {

    @Autowired
    private MedicationScheduleService medicationScheduleService;

    @GetMapping
    public ResponseEntity<List<MedicationSchedule>> getEntities(){
        List<MedicationSchedule> medicationSchedules = medicationScheduleService.findAll();
        return ResponseEntity.ok(medicationSchedules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationSchedule> getScheduleById(@PathVariable final int id){
        MedicationSchedule medicationSchedule = medicationScheduleService.findById(id);

        return medicationSchedule == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(medicationSchedule);
    }

    @GetMapping("/senior/{seniorId}")
    public ResponseEntity<List<MedicationSchedule>> getBySeniorId(@PathVariable final int seniorId){
        List<MedicationSchedule> medicationSchedules = medicationScheduleService.findBySeniorId(seniorId);

        return ResponseEntity.ok(medicationSchedules);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id){
        medicationScheduleService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<MedicationSchedule> create(@RequestBody final CreateMedicationScheduleDto createMedicationScheduleDto){
        MedicationSchedule medicationSchedule = createMedicationScheduleDto.toMedicationSchedule();

        final int id = medicationScheduleService.create(medicationSchedule);

        if(id == 0){
            return ResponseEntity.badRequest().build();
        }

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand(id).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationSchedule> update(@PathVariable final int id, @RequestBody final UpdateMedicationScheduleDto updateMedicationScheduleDto){

        final MedicationSchedule medicationSchedule = updateMedicationScheduleDto.toMedicationSchedule();

        boolean response = medicationScheduleService.update(id, medicationSchedule);

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }



















}
