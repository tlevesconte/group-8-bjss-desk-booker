package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.LocationDTO;
import com.example.group8officedeskbooking.model.CanvasMapper;
import com.example.group8officedeskbooking.model.DeskMapper;
import com.example.group8officedeskbooking.model.LocationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocationRepositoryJDBC implements LocationRepository {

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public LocationRepositoryJDBC(JdbcTemplate aTemplate) {
        jdbcTemplate = aTemplate;
    }

    @Override
    public List<LocationDTO> sendCities() {

        return jdbcTemplate.query(
                "select * from office_pos",
                new LocationMapper()
                );
    }

    @Override
    public void addCities(LocationDTO input){
        System.out.println(input.getCities());
        jdbcTemplate.update(
                "INSERT INTO office_pos (cities) VALuES (?)",
                input.getCities()
        );
        return;
    }
}