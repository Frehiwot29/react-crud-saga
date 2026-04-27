package com.app.i94_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.i94_backend.dto.I94Dto;
import com.app.i94_backend.entity.I94;
import com.app.i94_backend.service.I94Service;

@RestController
@RequestMapping("/api/i94")
@CrossOrigin(origins = "http://localhost:3000")
public class I94Controller {
    @Autowired
    private I94Service service;

    @PostMapping
    public ResponseEntity<I94> save(@RequestBody I94Dto dto){
        return ResponseEntity.ok(service.save(dto));
    }

    @GetMapping("/last")
    public ResponseEntity<I94> getLast(){
        I94 data=service.getLastRecorI94();
        if(data==null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(data);
    }

}
