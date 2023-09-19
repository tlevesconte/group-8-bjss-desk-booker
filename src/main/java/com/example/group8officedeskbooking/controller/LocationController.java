package com.example.group8officedeskbooking.controller;


import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.LocationDTO;
import com.example.group8officedeskbooking.repository.CanvasRepository;
import com.example.group8officedeskbooking.repository.DesksRepository;
import com.example.group8officedeskbooking.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import static java.lang.Integer.parseInt;

@RestController
public class LocationController {

    private LocationRepository locationRepo;

    @Autowired
    public LocationController(LocationRepository pRepo) {
        locationRepo = pRepo;
    }

    @RequestMapping(path = "/office", method = RequestMethod.GET)
    public List<LocationDTO> office(){
        return locationRepo.sendCities();
    }
    @RequestMapping(path = "/Addoffice", method = RequestMethod.POST)
    public void Addoffice(@RequestParam(value = "newcities", defaultValue = "null") String[] itemStr){
        LocationDTO cache = new LocationDTO(itemStr[0]);
        System.out.println(itemStr[0]);
        locationRepo.addCities(cache);
        return;
    }
}
