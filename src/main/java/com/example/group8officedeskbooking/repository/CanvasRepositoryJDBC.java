package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.model.CanvasMapper;
import com.example.group8officedeskbooking.model.DeskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CanvasRepositoryJDBC implements CanvasRepository{

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public CanvasRepositoryJDBC(JdbcTemplate aTemplate){
        jdbcTemplate = aTemplate;
    }

    @Override
    public List<CanvasDTO> findAllCanvas(String cities) {

        return jdbcTemplate.query(
                "select * from canvas_item where cities=?",
                new CanvasMapper(),
                new Object[] {cities}
        );
    }
    @Override
    public void insertCanvas(List<CanvasDTO> input){ //Delete all desk detail from sql, then append new one
        jdbcTemplate.update( //Delete all desk detail from sql
                "DELETE FROM canvas_item WHERE cities=?",
                input.get(0).getcities()
        );
        if(input.get(0).getcanvas_id() == -1){
            return; //If it is an empty submit
        }
        for(int i =0; i < input.size(); i++) {
            jdbcTemplate.update(
                    "INSERT INTO canvas_item (canvas_id, canvas_type, canvas_data, cities) VALuES (?,?,?,?)",
                    input.get(i).getcanvas_id(), input.get(i).getcanvas_type(), input.get(i).getcanvas_data(), input.get(i).getcities()

            );
        }
        return;
    }


}
