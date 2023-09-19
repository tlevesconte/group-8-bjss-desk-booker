package com.example.group8officedeskbooking.controller;


import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.repository.DesksRepository;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Integer.parseInt;


@RestController
public class DesksController {

    private DesksRepository desksRepo;
    ArrayList<DeskDTO> desks = new ArrayList<>();

    @Autowired
    public DesksController(DesksRepository pRepo) {
        desksRepo = pRepo;
    }

    @RequestMapping(path = "/AllDesks", method = RequestMethod.GET)
    public List<DeskDTO> getDesks(@RequestParam(value = "desk_type", defaultValue = "null") String str){

        return desksRepo.findAllDesks();
    }

    @RequestMapping(path = "/AllDesksByCity", method = RequestMethod.GET)
    public List<DeskDTO> getDesksByCities(@RequestParam(value = "cities", defaultValue = "null") String CityStr){
        //System.out.println(desksRepo.findDesksByCities(CityStr)+"***" + CityStr);
        return desksRepo.findDesksByCities(CityStr);
    }
    @RequestMapping(path = "/AdminOverwrite", method = RequestMethod.POST)
    public void AdminOver(@RequestParam(value = "TableChanges", defaultValue = "null") String[] itemStr) {
        ArrayList<DeskDTO> desks = new ArrayList<>();
        for(int i =0; i < itemStr.length; i++){
            System.out.println(itemStr[i]);
        }
        for(int i =1; i < Math.floor((itemStr.length-1)/3)+1; i++) {
            System.out.println("item" +i);
            DeskDTO cache = new DeskDTO(parseInt(itemStr[3*i-2]), itemStr[3*i-1], itemStr[3*i],itemStr[0]);
            desks.add(cache);
        }
        desksRepo.adminBooking(desks);
        return;
    }
    @RequestMapping(path = "/BookingDetails", method = RequestMethod.POST)
    public ModelAndView getBookingDetails(@RequestParam(value = "bookingItem", defaultValue = "null") String[] itemStr){
        System.out.print(itemStr[0]);
        ModelAndView mav = new ModelAndView();
        mav.addObject("bookingItem", desksToArray(itemStr));

        desksRepo.insertDeskBooking(desksToArray(itemStr));
        mav.setViewName("deskDetails");
        return mav;
    }

    @RequestMapping  (path="/User")
    public ModelAndView userPage(){
        return new ModelAndView("User");
    }

    public ArrayList<DeskDTO> desksToArray(String[] str) {
        ArrayList<DeskDTO> desks = new ArrayList<>();
        for(int i =0; i < Math.floor(str.length/4); i++){
            System.out.println(i);
            DeskDTO cache = new DeskDTO(parseInt(str[4*i+0]), str[4*i+1], str[4*i+2],str[4*i+3]);
            desks.add(cache);
        }
        return desks;
//        if (str.length > 3 && str.length < 7) {
//            DeskDTO desk1 = new DeskDTO(parseInt(str[0]), str[1], str[2]);
//            DeskDTO desk2 = new DeskDTO(parseInt(str[3]), str[4], str[5]);
//            desks.add(desk1);
//            desks.add(desk2);
//        }else if (str.length > 6) {
//            DeskDTO desk1 = new DeskDTO(parseInt(str[0]), str[1], str[2]);
//            DeskDTO desk2 = new DeskDTO(parseInt(str[3]), str[4], str[5]);
//            DeskDTO desk3 = new DeskDTO(parseInt(str[6]), str[7], str[8]);
//            desks.add(desk1);
//            desks.add(desk2);
//            desks.add(desk3);
//        }else {
//            DeskDTO desk1 = new DeskDTO(parseInt(str[0]), str[1], str[2]);
//            desks.add(desk1);
//        }
//        return desks;
    }

}
