package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.DeskposDTO;
import com.example.group8officedeskbooking.model.DeskposMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DeskposRepositoryJDBC implements DeskposRepository{

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public DeskposRepositoryJDBC(JdbcTemplate aTemplate){
        jdbcTemplate = aTemplate;
    }

    @Override
    public List<DeskposDTO> findAllDeskpos(String cities) {

        return jdbcTemplate.query(
                "select * from Desk_pos WHERE cities=? AND desk_type='desk'",
                new DeskposMapper(),
                new Object[] {cities}
        );
    }

    @Override
    public void insertDeskpos(List<DeskposDTO> input){ //Delete all desk detail from sql, then append new one
        jdbcTemplate.update( //Delete all desk detail from sql
            "DELETE FROM Desk_pos WHERE cities=?",
                input.get(0).getcities()
        );

        for(int i =0; i < input.size(); i++) {
            jdbcTemplate.update(
                    "INSERT INTO Desk_pos (desk_id, desk_type, desk_position, cities) VALuES (?,?,?,?)",
                    input.get(i).getdesk_id(), input.get(i).getdesk_type(), input.get(i).getdesk_position(), input.get(i).getcities()

            );
        }
        return;
    }
}
