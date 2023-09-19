package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.DTO.BookingDTO;
import com.example.group8officedeskbooking.Form.AddBookingForm;
import com.example.group8officedeskbooking.Form.EditEmployeeBookingForm;

import java.util.List;

public interface DeskBookingRepository {
    public BookingDTO findBookingsByID(int ID);
    public List<BookingDTO> findBookingsByEmployeeFirstName(String employeeFirstName);
    public Object findAllBookings();
    public boolean updateEmployeeBookingDetails(EditEmployeeBookingForm employeeBookingForm, int employeeCode);
    public boolean addBookings(AddBookingForm addBookingForm);
    public List<BookingDTO> displayImage();
}