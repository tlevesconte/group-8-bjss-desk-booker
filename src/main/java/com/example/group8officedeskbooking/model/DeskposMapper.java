package com.example.group8officedeskbooking.model;


import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.DeskposDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DeskposMapper implements RowMapper{

    @Override
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        return new DeskposDTO(rs.getInt("ID"),
                rs.getInt("desk_id"),
                rs.getString("desk_type"),
                rs.getString("desk_position"),
                rs.getString("cities")
        );
    }

}

