package br.fai.lds.elderconnect.controller;

import br.fai.lds.elderconnect.domain.Contract;
import br.fai.lds.elderconnect.domain.UserModel;
import br.fai.lds.elderconnect.dto.contract.*;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.contract.ContractService;
import br.fai.lds.elderconnect.ports_and_adapters.port.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("api/contracts")
public class ContractRestController {

    @Autowired
    private ContractService contractService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<ContractResponseDto>> getEntities() {

        ArrayList<ContractResponseDto> contractResponseDtos = new ArrayList<>();
        List<Contract> contracts = contractService.findAll();

        for (Contract contract : contracts) {

            UserModel seniorName = userService.findById(contract.getSeniorId());
            UserModel caregiverName = userService.findById(contract.getCaregiverId());

            ContractResponseDto contractResponseDto = ContractResponseDto.fromContract(contract, seniorName.getFullname(), caregiverName.getFullname());

            contractResponseDtos.add(contractResponseDto);
        }

        return ResponseEntity.ok(contractResponseDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractResponseDto> getEntityById(@PathVariable final int id) {

        Contract contract = contractService.findById(id);

        if (contract == null) {
            return ResponseEntity.notFound().build();
        }

        UserModel seniorName = userService.findById(contract.getSeniorId());
        UserModel caregiverName = userService.findById(contract.getCaregiverId());

        if (seniorName == null || caregiverName == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ContractResponseDto.fromContract(contract, seniorName.getFullname(), caregiverName.getFullname()));
    }

    @GetMapping("/senior-contracts/{seniorId}")
    public ResponseEntity<List<ContractResponseDto>> getEntitiesBySeniorId(@PathVariable final int seniorId) {

        ArrayList<ContractResponseDto> contractResponseDtos = new ArrayList<>();
        List<Contract> contracts = contractService.findBySeniorId(seniorId);

        for (Contract contract : contracts) {

            UserModel seniorName = userService.findById(contract.getSeniorId());
            UserModel caregiverName = userService.findById(contract.getCaregiverId());

            ContractResponseDto contractResponseDto = ContractResponseDto.fromContract(contract, seniorName.getFullname(), caregiverName.getFullname());

            contractResponseDtos.add(contractResponseDto);
        }

        return ResponseEntity.ok(contractResponseDtos);
    }

    @GetMapping("/caregiver-contracts/{caregiverId}")
    public ResponseEntity<List<ContractResponseDto>> getEntitiesByCaregiverId(@PathVariable final int caregiverId) {

        ArrayList<ContractResponseDto> contractResponseDtos = new ArrayList<>();
        List<Contract> contracts = contractService.findByCaregiverId(caregiverId);

        for (Contract contract : contracts) {

            UserModel seniorName = userService.findById(contract.getSeniorId());
            UserModel caregiverName = userService.findById(contract.getCaregiverId());

            ContractResponseDto contractResponseDto = ContractResponseDto.fromContract(contract, seniorName.getFullname(), caregiverName.getFullname());

            contractResponseDtos.add(contractResponseDto);
        }

        return ResponseEntity.ok(contractResponseDtos);
    }

    @PostMapping
    public ResponseEntity<Contract> create(@RequestBody final CreateContractDto createContractDto) {

        Contract contract = createContractDto.toContract();

        final int id = contractService.create(contract);

        if (id == 0) {
            return ResponseEntity.badRequest().build();
        }

        final URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand(id).toUri();

        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contract> update(@PathVariable final int id, @RequestBody final UpdateContractDto updateContractDto) {

        final Contract contract = updateContractDto.toContract();

        boolean response = contractService.update(id, contract);

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<Void> activateContract(@PathVariable final int id) {

        final boolean response = contractService.activateContract(id);

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/finish")
    public ResponseEntity<Void> finishContract(@PathVariable final int id, @RequestBody final FinishContractDto finishContractDto) {

        final boolean response = contractService.finishContract(id, finishContractDto.getEndDate());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/rating")
    public ResponseEntity<Void> ratingContract(@PathVariable final int id, @RequestBody final RatingContractDto ratingContractDto) {

        final boolean response = contractService.ratingContract(id, ratingContractDto.getRating(), ratingContractDto.getComment());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelContract(@PathVariable final int id, @RequestBody final CancelContractDto cancelContractDto) {

        final boolean response = contractService.cancelContract(id, cancelContractDto.getEndDate());

        return response ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final int id) {

        contractService.delete(id);

        return ResponseEntity.noContent().build();
    }
}
