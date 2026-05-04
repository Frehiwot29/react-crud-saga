package com.kassa.PetBackend.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.kassa.PetBackend.entity.AdoptionRequest;
import com.kassa.PetBackend.entity.Pet;
import com.kassa.PetBackend.entity.User;

import java.util.List;
import java.util.Optional;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
    List<AdoptionRequest> findByPetBreeder(User breeder);
    List<AdoptionRequest> findByBuyer(User buyer);
    Optional<AdoptionRequest> findByPetAndBuyer(Pet pet, User buyer);
    boolean existsByPetAndBuyer(Pet pet, User buyer);
}