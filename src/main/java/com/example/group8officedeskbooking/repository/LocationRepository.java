package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.LocationDTO;

import java.util.List;

public interface LocationRepository {
    public List<LocationDTO> sendCities();
    public void addCities(LocationDTO input);
}
