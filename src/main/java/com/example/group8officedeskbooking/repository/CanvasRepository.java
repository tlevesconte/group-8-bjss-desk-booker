package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;

import java.util.List;

public interface CanvasRepository {
    public List<CanvasDTO> findAllCanvas(String cities);
    public void insertCanvas(List<CanvasDTO> input);
}
