package com.example.group8officedeskbooking.DTO;

import com.fasterxml.jackson.databind.util.JSONPObject;

public class CanvasDTO<String> {
    private int ID;
    private int canvas_id;
    private int canvas_type;
    private String canvas_data;
    private String cities;

    public CanvasDTO(int ID, int canvas_id, int canvas_type, String canvas_data, String cities) {
        this.ID = ID;
        this.canvas_id = canvas_id;
        this.canvas_type = canvas_type;
        this.canvas_data = canvas_data;
        this.cities = cities;

    }
    public CanvasDTO( int canvas_id, int canvas_type, String canvas_data, String cities) {
        this.canvas_id = canvas_id;
        this.canvas_type = canvas_type;
        this.canvas_data = canvas_data;
        this.cities = cities;
    }
    public int getId() {
        return ID;
    }

    public int getcanvas_id() {
        return canvas_id;
    }

    public int getcanvas_type() {
        return canvas_type;
    }

    public String getcanvas_data() {
        return canvas_data;
    }

    public String getcities() {
        return cities;
    }

}
