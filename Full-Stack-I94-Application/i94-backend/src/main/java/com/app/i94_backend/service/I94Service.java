package com.app.i94_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.i94_backend.dto.I94Dto;
import com.app.i94_backend.entity.I94;
import com.app.i94_backend.repository.I94Repository;

@Service
public class I94Service {
    
    @Autowired
    private I94Repository repo;
    public I94 save(I94Dto dto){
        I94 entity=new I94();
        entity.setStreet(dto.getStreet());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setZip(dto.getZip());
        return repo.save(entity);
    }

    public I94 getLastRecorI94(){
        return repo.findTopByOrderByIdDesc();
    }


}
