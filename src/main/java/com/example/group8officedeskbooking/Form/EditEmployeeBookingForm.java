package com.example.group8officedeskbooking.Form;

public class EditEmployeeBookingForm {
    private int id;
    private String firstName;
    private String surname;
    private int employeeCode;
    private int phoneNumber;
    private String deskFacility;
    private String reason;
    private String email;
    private String bookingstarttime;
    private String bookingendtime;

    public EditEmployeeBookingForm(int id, String firstName, String surname, int employeeCode, int phoneNumber, String deskFacility, String reason, String email, String bookingstarttime, String bookingendtime) {
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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public int getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(int employeeCode) {
        this.employeeCode = employeeCode;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDeskFacility() {
        return deskFacility;
    }

    public void setDeskFacility(String deskFacility) {
        this.deskFacility = deskFacility;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBookingstarttime() {
        return bookingstarttime;
    }

    public void setBookingstarttime(String bookingstarttime) {
        this.bookingstarttime = bookingstarttime;
    }

    public String getBookingendtime() {
        return bookingendtime;
    }

    public void setBookingendtime(String bookingendtime) {
        this.bookingendtime = bookingendtime;
    }

    @Override
    public String toString() {
        return "EditEmployeeBookingForm{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", surname='" + surname + '\'' +
                ", employeeCode=" + employeeCode +
                ", phoneNumber=" + phoneNumber +
                ", deskFacility='" + deskFacility + '\'' +
                ", reason='" + reason + '\'' +
                ", email='" + email + '\'' +
                ", bookingstarttime='" + bookingstarttime + '\'' +
                ", bookingendtime='" + bookingendtime + '\'' +
                '}';
    }
}




