package com.example.group8officedeskbooking.model;


import com.example.group8officedeskbooking.DTO.DeskDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DeskMapper implements RowMapper{

    @Override
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        return new DeskDTO(rs.getInt("ID"),
                rs.getInt("desk_id"),
                rs.getString("desk_type"),
                rs.getString("bookedDate"),
                rs.getString("bookedName"),
                rs.getString("cities")
                );
    }

}

