package com.example.group8officedeskbooking.controller;


import com.example.group8officedeskbooking.DTO.CanvasDTO;
import com.example.group8officedeskbooking.DTO.DeskDTO;
import com.example.group8officedeskbooking.repository.CanvasRepository;
import com.example.group8officedeskbooking.repository.DesksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import static java.lang.Integer.parseInt;

@RestController
public class CanvasController {

    private CanvasRepository canvasRepo;

    @Autowired
    public CanvasController(CanvasRepository pRepo) {
        canvasRepo = pRepo;
    }

    @RequestMapping(path = "/Canvas", method = RequestMethod.GET)
    public List<CanvasDTO> getCanvas(@RequestParam(value = "cities", defaultValue = "null") String cities){

        return canvasRepo.findAllCanvas(cities);
    }
    @RequestMapping  (path="/insertCanvas", method = RequestMethod.POST)
    public void intDeskpos(@RequestParam(value = "canvas_item", defaultValue = "null") String[] itemStr){
        for (int i = 0 ;i < itemStr.length; i++) {
            System.out.println(itemStr[i]);
        }

        canvasRepo.insertCanvas(ToArray(itemStr));

        return;
    }

    public ArrayList<CanvasDTO> ToArray(String[] str){
        ArrayList<CanvasDTO> append_arr = new ArrayList<>();
        int i =4;
        boolean empty_check = true;
        if(parseInt(str[1]) == 0){ //skip this
            i++;
        }
        else{
            empty_check = false;
            for (int j =0 ; j < parseInt(str[1]); j ++){
                String canvas_array = "[" + str[i+j*4];
                for(int k = 1; k < 4; k++){
                    canvas_array += ","+str[i+j*4+k];
                }
                canvas_array += "]";
                CanvasDTO cache = new CanvasDTO(j, 0 , canvas_array,str[0]);
                append_arr.add(cache);
            }
            i+= parseInt(str[1])*4;
        }
        if(parseInt(str[2]) == 0){ //skip this
            i++;
        }
        else{
            empty_check = false;
            for (int j =0 ; j < parseInt(str[2]); j ++){
                String canvas_array = "[" + str[i+j*4];
                for(int k = 1; k < 4; k++){
                    if(k == 2){
                        canvas_array += ',';
                        canvas_array += '"'+str[i+j*4+k]+'"';
                        continue;
                    }
                    canvas_array += ","+str[i+j*4+k];
                }
                canvas_array += "]";
                CanvasDTO cache = new CanvasDTO(j, 1 , canvas_array,str[0]);
                append_arr.add(cache);
            }
            i+= parseInt(str[2])*4;
        }
        if(parseInt(str[3]) != 0){
            empty_check = false;
            for (int j =0 ; j < parseInt(str[3]); j ++){
                String canvas_array = "[" + str[i+j*4];
                for(int k = 1; k < 4; k++){
                    canvas_array += ","+str[i+j*4+k];
                }
                canvas_array += "]";
                CanvasDTO cache = new CanvasDTO(j, 2 , canvas_array,str[0]);
                append_arr.add(cache);
            }
        }
        if(empty_check) { //If the input is empty, return -1 canvas_id to database
            CanvasDTO cache = new CanvasDTO(-1, -1, "", str[0]);
            append_arr.add(cache);
            return append_arr;
        }
//        while(i < str.length){
//            System.out.print(str.length);
//            System.out.println(str[5]);
//            String canvas_array = "[" + str[i];
//            for(int j = 1; j < 4; j++){
//                if(id == 1 && j == 2){
//                    canvas_array += ',';
//                    canvas_array += '"'+str[i+j]+'"';
//                    continue;
//                }
//                canvas_array += ","+str[i+j];
//            }
//            canvas_array += "]";
//            i +=4;
//
//            CanvasDTO cache = new CanvasDTO(i/4, id , canvas_array,str[0]);
//            append_arr.add(cache);
//            int index_check = i/4 - parseInt(str[1]);
//            if(index_check > 0 ){ //If it is a text node
//                id = 1;
//                if(index_check > parseInt(str[2])){
//                    id = 2;
//                }
//            }
//        }
        return append_arr;
    }

    @RequestMapping  (path="/Admin")
    public ModelAndView adminPage(){
        return new ModelAndView("Admin");
    }

}
