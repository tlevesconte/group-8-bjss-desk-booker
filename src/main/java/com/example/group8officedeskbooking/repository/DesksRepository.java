package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.DeskDTO;

import java.util.List;

public interface DesksRepository {
    public List<DeskDTO> findAllDesks();
    public List<DeskDTO> findDesksByCities(String cities);
    public void insertDeskBooking(List<DeskDTO> input);
    public void adminBooking(List<DeskDTO> input);
}
