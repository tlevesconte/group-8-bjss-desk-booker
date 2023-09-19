package com.example.group8officedeskbooking.DTO;

import org.springframework.web.multipart.MultipartFile;

public class BookingDTO {
    private int id;
    private String firstName;
    private String surname;
    private int employeeCode;
    private int phoneNumber;
    private String deskFacility;
    private String reason;
    private String email;
  //  private MultipartFile displayImage;
    private String bookingstarttime;
    private String bookingendtime;

    public BookingDTO(int id, String firstName, String surname, int employeeCode, int phoneNumber, String deskFacility, String reason, String email, String bookingstarttime, String bookingendtime) {
        this.id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.employeeCode = employeeCode;
        this.phoneNumber = phoneNumber;
        this.deskFacility = deskFacility;
        this.reason = reason;
        this.email = email;
        this.bookingstarttime = bookingstarttime;
        this.bookingendtime = bookingendtime;
    }

    public BookingDTO(String displayImage) {
    }


    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public int getEmployeeCode() {
        return employeeCode;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public String getDeskFacility() {
        return deskFacility;
    }

    public String getReason() {
        return reason;
    }

    public String getEmail() {
        return email;
    }

    public String getBookingstarttime() {
        return bookingstarttime;
    }

    public String getBookingendtime() {
        return bookingendtime;
    }
}

