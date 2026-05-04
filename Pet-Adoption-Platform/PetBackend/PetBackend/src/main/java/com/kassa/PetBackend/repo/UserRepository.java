package com.kassa.PetBackend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.kassa.PetBackend.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}