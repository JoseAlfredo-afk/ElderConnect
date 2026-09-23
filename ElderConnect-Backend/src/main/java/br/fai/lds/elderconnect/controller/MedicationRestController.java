package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.Medication;
import br.fai.lds.elderconnect.dto.medication.CreateMedicationDto;
import br.fai.lds.elderconnect.dto.medication.UpdateMedicationDto;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.medication.MedicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/medications")
public class MedicationRestController {

    @Autowired
    private MedicationService medicationService;

    @GetMapping
    public ResponseEntity<List<Medication>> getEntities() {
        List<Medication> medications = medicationService.findAll();
        return ResponseEntity.ok(medications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Medication> getMedicationById(@PathVariable final int id) {

        Medication medication = medicationService.findById(id);

        return medication == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(medication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id) {

        medicationService.delete(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Medication> create(@RequestBody final CreateMedicationDto createMedicationDto) {

        Medication medication = createMedicationDto.toMedication();

        final int id = medicationService.create(medication);

        if (id == 0) {
            return ResponseEntity.badRequest().build();
        }

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand(id).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Medication> update(@PathVariable final int id, @RequestBody final UpdateMedicationDto updateMedicationDto) {

        final Medication medication = updateMedicationDto.toMedication();

        boolean response = medicationService.update(id, medication);

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
