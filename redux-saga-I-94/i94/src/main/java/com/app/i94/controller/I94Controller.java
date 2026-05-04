package com.app.i94.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.i94.srevice.I94Service;
import com.app.i94.entity.I94Record;
import jakarta.validation.Valid;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/i94")
public class I94Controller {
       private final I94Service service;

    public I94Controller(I94Service service) {
        this.service = service;
    }

    @PostMapping
    public I94Record createNewI94(@Valid @RequestBody I94Record request) {
        return service.createNewI94(request);
    }

    @GetMapping("/{admissionNumber}")
    public I94Record getByAdmissionNumber(@PathVariable String admissionNumber) {
        return service.getByAdmissionNumber(admissionNumber);
    }
}
