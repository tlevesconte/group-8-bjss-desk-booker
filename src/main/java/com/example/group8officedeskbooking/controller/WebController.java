package com.example.group8officedeskbooking.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {

    @RequestMapping ("/")
    public String homePage() {
        return "login";
    }

    @RequestMapping ("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/Interface")
    public String Interface() {
        return "Interface";
    }

    @GetMapping ("/Booking")
    public String Booking() {
        return "Booking";
    }

    @GetMapping ("/Admin")
    public String Admin() {
        return "Admin";
    }

    @GetMapping ("/User")
    public String User() {
        return "User";
    }

    @GetMapping ("AdminDashboard")
    public String AdminDashboard() {
        return "AdminDashboard";
    }

    @GetMapping ("/UserDashboard")
    public String UserDashboard() {
        return "UserDashboard";
    }
}
