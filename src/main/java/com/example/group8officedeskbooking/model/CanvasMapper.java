package com.example.group8officedeskbooking.model;


import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class CanvasMapper implements RowMapper{

    @Override
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        return new CanvasDTO(rs.getInt("ID"),
                rs.getInt("canvas_id"),
                rs.getInt("canvas_type"),
                rs.getString("canvas_data"),
                rs.getString("cities")
        );
    }

}

