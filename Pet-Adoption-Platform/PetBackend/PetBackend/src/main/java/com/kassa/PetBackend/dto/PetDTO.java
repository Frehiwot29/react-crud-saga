package com.kassa.PetBackend.dto;
import com.kassa.PetBackend.entity.Pet;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PetDTO {
    private Long id;
    private String name;
    private String breed;
    private Integer age;
    private String size;
    private String location;
    private String description;
    private String imageUrl;
    private String status;
    private Long breederId;
    private String breederName;
    private Integer requestCount;
    
    public static PetDTO fromEntity(Pet pet) {
        PetDTO dto = new PetDTO();
        dto.setId(pet.getId());
        dto.setName(pet.getName());
        dto.setBreed(pet.getBreed());
        dto.setAge(pet.getAge());
        dto.setSize(pet.getSize().toString());
        dto.setLocation(pet.getLocation());
        dto.setDescription(pet.getDescription());
        dto.setImageUrl(pet.getImageUrl());
        dto.setStatus(pet.getStatus().toString());
        dto.setBreederId(pet.getBreeder().getId());
        dto.setBreederName(pet.getBreeder().getName());
        return dto;
    }
}