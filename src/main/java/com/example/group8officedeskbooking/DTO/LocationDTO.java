package com.example.group8officedeskbooking.DTO;

import com.fasterxml.jackson.databind.util.JSONPObject;

public class LocationDTO<String> {
    private int ID;
    private String cities;

    public LocationDTO(int ID, String cities) {
        this.ID = ID;
        this.cities = cities;

    }
    public LocationDTO( String cities) {
        this.cities = cities;

    }
    public int getId() {
        return ID;
    }

    public String getCities() {
        return cities;
    }

}
