package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.DeskposDTO;

import java.util.List;

public interface DeskposRepository {
    public List<DeskposDTO> findAllDeskpos(String cities);
    public void insertDeskpos(List<DeskposDTO> input);
}
