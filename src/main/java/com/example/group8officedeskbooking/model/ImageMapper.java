package com.example.group8officedeskbooking.model;


import com.example.group8officedeskbooking.DTO.BookingDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ImageMapper implements RowMapper {

    @Override
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        BookingDTO displayImage = new BookingDTO(rs.getString("displayImage"));
        return displayImage;
    }
}
