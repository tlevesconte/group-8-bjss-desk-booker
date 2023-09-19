package com.example.group8officedeskbooking.controller;

import com.example.group8officedeskbooking.DTO.BookingDTO;
import com.example.group8officedeskbooking.Form.AddBookingForm;
import com.example.group8officedeskbooking.Form.EditEmployeeBookingForm;
import com.example.group8officedeskbooking.repository.DeskBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

@Controller
public class DeskbookingController {

    private DeskBookingRepository deskBookingRepository;

    @Autowired
    public DeskbookingController(DeskBookingRepository deskBookingRepository) {
        this.deskBookingRepository = deskBookingRepository;
    }

//    @RequestMapping(path = "/")
//    public String gotoAddBookings() {
//        return "EmployeeBookingForm";
//    }

    //Displays booking form
    @RequestMapping(path = "/booking/employeeBookingForm")
    public String gotoBookingsForm() {
        return "EmployeeBookingForm";
    }


    //Capture the data from the form and create an entry in the database.
    @RequestMapping(path="/addBookings", method = RequestMethod.POST)
    public ModelAndView addBooking(AddBookingForm addBookingForm, BindingResult br) throws Exception {
        ModelAndView mav = new ModelAndView();

        //Decode the QR image received and convert it to the String
        String DeskInformation= QRCodeGenerator.readQRCodeImage(addBookingForm.getDisplayImage());
        addBookingForm.setDeskFacility(DeskInformation);
        if (br.hasErrors()) {
            mav.setViewName("Interface");
        } else {
            if (deskBookingRepository.addBookings(addBookingForm)) {
                mav.setViewName("ViewBookingsDone");

            }
        }
        return mav;
    }
    //Show the Admin booking table
    @RequestMapping(path="/showbooking/Admin")
    public ModelAndView gotoAdminBookings(){
        ModelAndView mav = new ModelAndView();
        mav.addObject("bookings", deskBookingRepository.findAllBookings());
        mav.setViewName("BookingTable(Admin)");
        return mav;
    }

    //Show the Employee booking table
    @RequestMapping(path="/showbooking/Employee")
    public ModelAndView gotoEmployeeBookings(Principal principal){
        System.out.println("Entered into the employee table view");
        System.out.println("Logged in user is :"+principal.getName());

        ModelAndView mav = new ModelAndView();
        mav.addObject("bookings", deskBookingRepository.findBookingsByEmployeeFirstName(principal.getName()));
        System.out.println("Before attaching the object");
        mav.setViewName("BookingTable(Employee)");
        return mav;
    }

    @RequestMapping(path="/booking/employee/edit/")
    public ModelAndView searchEmployee(@RequestParam(value="id") int ID)
    {
        System.out.println("entered edit controller");
        System.out.println(ID);
        ModelAndView mav = new ModelAndView();
        //mav.addObject("empBookings",deskBookingRepository.findBookingsByEmployeeCode(employeeID));
        mav.addObject("empBooking",deskBookingRepository.findBookingsByID(ID));
        System.out.println("before Page Redirection");

        BookingDTO  bt=  deskBookingRepository.findBookingsByID(ID);
        System.out.println("firstname");
        System.out.println(bt.getFirstName());
        mav.setViewName("EmployeeEditForm");
        return mav;
    }

    @RequestMapping(path="/booking/employee/edit/saveChanges")
    public ModelAndView saveEmployeeTableEdit(EditEmployeeBookingForm editEmployeeBookingForm, BindingResult br){
        ModelAndView mav = new ModelAndView();
        if(br.hasErrors()){
            System.out.println(br);
            mav.setViewName("Interface");
        }
        else {
            System.out.println(editEmployeeBookingForm.toString());
            if(deskBookingRepository.updateEmployeeBookingDetails(editEmployeeBookingForm,editEmployeeBookingForm.getId())){
                mav.addObject("bookings", deskBookingRepository.findAllBookings());
                System.out.println("Before attaching the object");
                mav.setViewName("BookingTable(Employee)");
            }
        }
        return mav;
    }
    @RequestMapping(path="/booking/admin/edit/")
    public ModelAndView searchEmployeeAdminController(@RequestParam(value="id") int ID)
    {
        System.out.println("entered edit controller");
        System.out.println(ID);
        ModelAndView mav = new ModelAndView();
        //mav.addObject("empBookings",deskBookingRepository.findBookingsByEmployeeCode(employeeID));
        mav.addObject("empBooking",deskBookingRepository.findBookingsByID(ID));
        System.out.println("before Page Redirection");

        BookingDTO bt=  deskBookingRepository.findBookingsByID(ID);
        System.out.println("firstname");
        System.out.println(bt.getFirstName());
        mav.setViewName("AdminEditForm");
        return mav;
    }

    @RequestMapping(path="/booking/admin/edit/saveChanges")
    public ModelAndView saveEmployeeTableEditAdminController(EditEmployeeBookingForm editEmployeeBookingForm, BindingResult br){
        ModelAndView mav = new ModelAndView();
        if(br.hasErrors()){
            System.out.println(br);
            mav.setViewName("Interface");
        }
        else {
            System.out.println(editEmployeeBookingForm.toString());
            if(deskBookingRepository.updateEmployeeBookingDetails(editEmployeeBookingForm,editEmployeeBookingForm.getId())){
                mav.addObject("bookings", deskBookingRepository.findAllBookings());
                System.out.println("Before attaching the object");
                mav.setViewName("BookingTable(Admin)");
            }
        }
        return mav;
    }

}