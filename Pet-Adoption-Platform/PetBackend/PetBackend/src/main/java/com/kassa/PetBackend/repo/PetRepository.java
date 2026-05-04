package com.kassa.PetBackend.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.kassa.PetBackend.entity.Pet;
import com.kassa.PetBackend.entity.User;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long>, JpaSpecificationExecutor<Pet> {
    Page<Pet> findByStatus(Pet.Status status, Pageable pageable);
    List<Pet> findByBreeder(User breeder);
    Page<Pet> findByBreederAndStatus(User breeder, Pet.Status status, Pageable pageable);
}
