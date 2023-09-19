package com.example.group8officedeskbooking.DTO;

import java.util.ArrayList;

import static java.lang.Integer.parseInt;

public class DeskDTO {
    private int ID;
    private int deskId;
    private String deskType;
    private String bookedDate;
    private String bookedName;
    private String bookedReason;
    private String cities;

    public DeskDTO(int ID, int deskId, String deskType, String bookedDate, String bookedName, String cities) {
        this.ID = ID;
        this.deskId = deskId;
        this.deskType = deskType;
        this.bookedDate = bookedDate;
        this.bookedName = bookedName;
        this.cities = cities;

    }
    public DeskDTO(int deskId, String bookedDate, String bookedName, String cities) {
        this.deskId = deskId;
        this.bookedName = bookedName;
        this.bookedDate = bookedDate;
        this.cities = cities;
    }

    public int getId() {
        return ID;
    }

    public int getDeskId() {
        return deskId;
    }

    public String getDeskType() {
        return deskType;
    }

    public String getBookedDate() {
        return bookedDate;
    }

    public String getBookedName() {
        return bookedName;
    }

    public String getBookedReason() {
        return bookedReason;
    }

    public String getCities() {
        return cities;
    }


}
