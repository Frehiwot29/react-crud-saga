package com.app.i94.srevice;
import com.app.i94.entity.I94Record;
import com.app.i94.repository.*;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class I94Service {

    private final I94RecordRepository repository;

    public I94Service(I94RecordRepository repository) {
        this.repository = repository;
    }

    public I94Record createNewI94(I94Record request) {
        // Generate a simple admission number (you can replace with your own logic)
        String admissionNumber = "ADM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        request.setAdmissionNumber(admissionNumber);
        return repository.save(request);
    }

    public I94Record getByAdmissionNumber(String admissionNumber) {
        return repository.findByAdmissionNumber(admissionNumber)
                .orElse(null);
    }
}


