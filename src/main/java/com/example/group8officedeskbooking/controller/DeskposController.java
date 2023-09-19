package com.example.group8officedeskbooking.controller;


import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.DTO.DeskposDTO;
import com.example.group8officedeskbooking.repository.DeskposRepository;
import com.example.group8officedeskbooking.repository.DesksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

import static com.fasterxml.jackson.core.io.NumberInput.parseInt;
import static com.fasterxml.jackson.databind.cfg.CoercionInputShape.String;


@RestController
public class DeskposController {

    private DeskposRepository deskposRepo;

    @Autowired
    public DeskposController(DeskposRepository pRepo) {
        deskposRepo = pRepo;
    }

    @RequestMapping(path = "/Deskpos", method = RequestMethod.GET)
    public List<DeskposDTO> getDeskpos(@RequestParam(value = "cities", defaultValue = "null") String cities){

        return deskposRepo.findAllDeskpos(cities);
    }

    @RequestMapping  (path="/insertDeskpos", method = RequestMethod.POST)
    public void intDeskpos(@RequestParam(value = "Deskpos", defaultValue = "null") String[] itemStr){
//        for (int i = 0 ;i < itemStr.length; i++) {
//            System.out.println(itemStr[i]);
//        }
        deskposRepo.insertDeskpos(ToArray(itemStr));

        return;
    }

    public ArrayList<DeskposDTO> ToArray(String[] str){
        ArrayList<DeskposDTO> append_arr = new ArrayList<>();
        int i =1;
        while(i < str.length){
            String desk_array = "[" + str[i];
            for(int j = 1; j < 4; j++){
                desk_array += ","+str[i+j];
            }
            desk_array += "]";
            i +=5;
            DeskposDTO cache = new DeskposDTO(parseInt(str[i-1]), "desk", desk_array,str[0]);
            append_arr.add(cache);
            if(parseInt(str[i]) == -1){
                String array = "[" + str[i+1];
                for(int j = i+2; j < str.length; j++){
                    array += ","+str[j];
                }
                array +="]";
                DeskposDTO dele = new DeskposDTO(-1, "desk", array, str[0]);
                append_arr.add(dele);
                break;
            }
        }
        return append_arr;
    }
}
