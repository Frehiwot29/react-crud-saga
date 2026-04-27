package com.app.i94_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.i94_backend.entity.I94;

public interface I94Repository extends JpaRepository<I94,Long>{
    I94 findTopByOrderByIdDesc();
}
