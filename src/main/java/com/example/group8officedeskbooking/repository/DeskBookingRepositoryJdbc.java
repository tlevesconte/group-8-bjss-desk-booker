package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.BookingDTO;
import com.example.group8officedeskbooking.Form.AddBookingForm;
import com.example.group8officedeskbooking.Form.EditEmployeeBookingForm;
import com.example.group8officedeskbooking.model.BookingMapper;
import com.example.group8officedeskbooking.model.ImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DeskBookingRepositoryJdbc implements DeskBookingRepository{

    private JdbcTemplate jdbcTemplate;

    @Autowired
    public DeskBookingRepositoryJdbc(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public BookingDTO findBookingsByID(int ID) {
        BookingDTO bookingDTO = (BookingDTO) jdbcTemplate.queryForObject("select ID, firstName, surname, employeeCode, phoneNumber, deskFacility, reason, email,bookingstarttime, bookingendtime from Mybookings where ID=?"
                ,new BookingMapper()
                ,ID);
        return bookingDTO;
    }


    @Override
    public List<BookingDTO> findBookingsByEmployeeFirstName(String employeeFirstName) {
        System.out.println("query by employee firstname");
        System.out.println(employeeFirstName);
        return  jdbcTemplate.query(
                "select ID, firstName, surname, employeeCode, phoneNumber, deskFacility, reason, email,bookingstarttime, bookingendtime from Mybookings where firstName=? and isApproved =?"
                ,new BookingMapper()
                ,employeeFirstName
                , "true");
    }



    @Override
    public List<BookingDTO> findAllBookings() {
        return jdbcTemplate.query(
                "select ID, firstName, surname, employeeCode, phoneNumber, deskFacility, reason, email,bookingstarttime, bookingendtime from Mybookings where isApproved=?"
                ,new BookingMapper()
                ,"false");
    }

    @Override
    public List<BookingDTO> displayImage() {
        return jdbcTemplate.query("select displayImage from MyBookings", new ImageMapper());
    }


    @Override
    public boolean addBookings(AddBookingForm addBookingForm) {
        System.out.println("entered into booking repository");
        int rows = jdbcTemplate.update(
                "INSERT INTO MyBookings(firstName, surname, employeeCode, phoneNumber, deskFacility, reason, email, bookingstarttime, bookingendtime, isApproved) VALUES (?,?,?,?,?,?,?,?,?,?);",
                addBookingForm.getFirstName(),
                addBookingForm.getSurname(),
                addBookingForm.getEmployeeCode(),
                addBookingForm.getPhoneNumber(),
                addBookingForm.getDeskFacility(),
                addBookingForm.getReason(),
                addBookingForm.getEmail(),
                addBookingForm.getBookingstarttime(),
                addBookingForm.getBookingendtime(),
                "false"
        );
        return rows>0;
    }
    @Override
    public boolean updateEmployeeBookingDetails(EditEmployeeBookingForm editEmployeeBookingForm, int ID)
    {
        System.out.println("entered into update repository");
        System.out.println(editEmployeeBookingForm.toString());
        System.out.println("employeecode is :"+ID);
        int rows = jdbcTemplate.update(
                "update MyBookings set firstName=?, surname=?, employeeCode=?, phoneNumber=?, deskFacility=?, reason=?, email=?, bookingstarttime=?, bookingendtime=? where ID=?",
                editEmployeeBookingForm.getFirstName(),
                editEmployeeBookingForm.getSurname(),
                editEmployeeBookingForm.getEmployeeCode(),
                editEmployeeBookingForm.getPhoneNumber(),
                editEmployeeBookingForm.getDeskFacility(),
                editEmployeeBookingForm.getReason(),
                editEmployeeBookingForm.getEmail(),
                editEmployeeBookingForm.getBookingstarttime(),
                editEmployeeBookingForm.getBookingendtime(),
                ID
        );
        return rows>0;
    }

}