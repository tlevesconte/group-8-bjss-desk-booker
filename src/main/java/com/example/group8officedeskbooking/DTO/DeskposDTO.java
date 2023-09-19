package com.example.group8officedeskbooking.DTO;

import com.fasterxml.jackson.databind.util.JSONPObject;

public class DeskposDTO<String> {
    private int ID;
    private int desk_id;
    private String desk_type;
    private String desk_position;
    private String cities;

    public DeskposDTO(int ID,  int desk_id, String desk_type,String desk_position, String cities) {
        this.ID = ID;
        this.desk_id = desk_id;
        this.desk_type = desk_type;
        this.desk_position = desk_position;
        this.cities = cities;

    }
    public DeskposDTO(  int desk_id, String desk_type,String desk_position, String cities) {
        this.desk_id = desk_id;
        this.desk_type = desk_type;
        this.desk_position = desk_position;
        this.cities = cities;
    }
    public DeskposDTO(  String desk_type,String desk_position, String cities) {
        this.desk_type = desk_type;
        this.desk_position = desk_position;
        this.cities = cities;
    }

    public int getId() {
        return ID;
    }

    public String getdesk_type() {
        return desk_type;
    }

    public int getdesk_id() {
        return desk_id;
    }

    public String getdesk_position() {
        return desk_position;
    }

    public String getcities() {
        return cities;
    }

}
