package com.kassa.PetBackend.controller;

import com.kassa.PetBackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.persistence.criteria.Predicate;

import com.kassa.PetBackend.dto.PetDTO;
import com.kassa.PetBackend.entity.Pet;
import com.kassa.PetBackend.repo.PetRepository;
import com.kassa.PetBackend.repo.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:3000")
public class PetController {
    
    @Autowired
    private PetRepository petRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<Page<PetDTO>> getPets(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String breed,
            @RequestParam(required = false) String size,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size_param) {
        
        Specification<Pet> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.equal(root.get("status"), Pet.Status.AVAILABLE));
            
            if (location != null && !location.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("location")), "%" + location.toLowerCase() + "%"));
            }
            if (breed != null && !breed.isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("breed")), "%" + breed.toLowerCase() + "%"));
            }
            if (size != null && !size.isEmpty()) {
                predicates.add(cb.equal(root.get("size"), Pet.Size.valueOf(size)));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        
        Page<Pet> pets = petRepository.findAll(spec, PageRequest.of(page, size_param));
        Page<PetDTO> petDTOs = pets.map(PetDTO::fromEntity);
        
        return ResponseEntity.ok(petDTOs);
    }
    
    @PostMapping
    public ResponseEntity<PetDTO> createPet(@RequestBody PetDTO petDTO, @RequestHeader("userId") Long userId) {
        User breeder = userRepository.findById(userId).orElseThrow();
        
        Pet pet = new Pet();
        pet.setName(petDTO.getName());
        pet.setBreed(petDTO.getBreed());
        pet.setAge(petDTO.getAge());
        pet.setSize(Pet.Size.valueOf(petDTO.getSize()));
        pet.setLocation(petDTO.getLocation());
        pet.setDescription(petDTO.getDescription());
        pet.setImageUrl(petDTO.getImageUrl());
        pet.setBreeder(breeder);
        
        return ResponseEntity.ok(PetDTO.fromEntity(petRepository.save(pet)));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PetDTO> updatePet(@PathVariable Long id, @RequestBody PetDTO petDTO) {
        Pet pet = petRepository.findById(id).orElseThrow();
        pet.setName(petDTO.getName());
        pet.setBreed(petDTO.getBreed());
        pet.setAge(petDTO.getAge());
        pet.setSize(Pet.Size.valueOf(petDTO.getSize()));
        pet.setLocation(petDTO.getLocation());
        pet.setDescription(petDTO.getDescription());
        pet.setImageUrl(petDTO.getImageUrl());
        
        return ResponseEntity.ok(PetDTO.fromEntity(petRepository.save(pet)));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        petRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updatePetStatus(@PathVariable Long id, @RequestBody String status) {
        Pet pet = petRepository.findById(id).orElseThrow();
        pet.setStatus(Pet.Status.valueOf(status));
        petRepository.save(pet);
        return ResponseEntity.ok().build();
    }
}
