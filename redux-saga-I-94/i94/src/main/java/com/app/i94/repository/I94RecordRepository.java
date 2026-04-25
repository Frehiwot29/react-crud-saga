package com.app.i94.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.i94.entity.I94Record;

import java.util.Optional;

public interface I94RecordRepository extends JpaRepository<I94Record, Long> {
    Optional<I94Record> findByAdmissionNumber(String admissionNumber);
}
