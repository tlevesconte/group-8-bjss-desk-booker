package com.example.group8officedeskbooking.model;


import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.LocationDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class LocationMapper implements RowMapper{

    @Override
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        return new LocationDTO(rs.getInt("ID"),
                rs.getString("cities")
        );
    }

}

