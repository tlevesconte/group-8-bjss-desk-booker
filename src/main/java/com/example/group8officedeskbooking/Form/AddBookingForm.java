package com.example.group8officedeskbooking.Form;

import org.springframework.web.multipart.MultipartFile;

public class AddBookingForm {
    private String firstName;
    private String surname;
    private int employeeCode;
    private int phoneNumber;
    private String deskFacility;
    private String reason;
    private String email;
    private MultipartFile displayImage;
    private String bookingstarttime;
    private String bookingendtime;


    public AddBookingForm(String firstName, String surname, int employeeCode, int phoneNumber, String reason, String email, MultipartFile displayImage, String bookingstarttime, String bookingendtime) {
        this.firstName = firstName;
        this.surname = surname;
        this.employeeCode = employeeCode;
        this.phoneNumber = phoneNumber;
        this.reason = reason;
        this.email = email;
        this.displayImage = displayImage;
        this.bookingstarttime = bookingstarttime;
        this.bookingendtime = bookingendtime;
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
    public MultipartFile getDisplayImage() {
        return displayImage;
    }

    public void setDeskFacility(String deskFacility) {
        this.deskFacility = deskFacility;
    }

    public String getBookingstarttime() {
        return bookingstarttime;
    }

    public String getBookingendtime() {
        return bookingendtime;
    }
}

