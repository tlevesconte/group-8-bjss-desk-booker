package com.example.group8officedeskbooking.model;

import com.example.group8officedeskbooking.DTO.BookingDTO;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class BookingMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new BookingDTO(
                rs.getInt("ID"),
                rs.getString("firstName"),
                rs.getString("surname"),
                rs.getInt("employeeCode"),
                rs.getInt("phoneNumber"),
                rs.getString("deskFacility"),
                rs.getString("reason"),
                rs.getString("email"),
                rs.getString("bookingstarttime"),
                rs.getString("bookingendtime")
        );
    }
}
