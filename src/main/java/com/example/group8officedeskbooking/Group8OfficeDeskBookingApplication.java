package com.example.group8officedeskbooking;

import com.example.group8officedeskbooking.model.ApplicationRole;
import com.example.group8officedeskbooking.model.ApplicationUser;
import com.example.group8officedeskbooking.service.ApplicationUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class Group8OfficeDeskBookingApplication {

    public static void main(String[] args) {
        SpringApplication.run(Group8OfficeDeskBookingApplication.class, args);
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Run on launch
    @Bean
    CommandLineRunner run(ApplicationUserService applicationUserService) {
        return args -> {
            // Create roles
            applicationUserService.saveRole(new ApplicationRole(null, "ROLE_USER")); // Null because JPA handles this
            applicationUserService.saveRole(new ApplicationRole(null, "ROLE_ADMIN")); // Null because JPA handles this

            // Create users
            // Encode the password before storing it in the database
            applicationUserService.saveUser(new ApplicationUser(null, "Jeff", "jeff", bCryptPasswordEncoder().encode("user"), new ArrayList<>())); // Null because JPA handles this
            applicationUserService.saveUser(new ApplicationUser(null, "Tom", "tom", bCryptPasswordEncoder().encode("user"), new ArrayList<>())); // Null because JPA handles this
            applicationUserService.saveUser(new ApplicationUser(null, "Jane Doe", "admin", bCryptPasswordEncoder().encode("admin"), new ArrayList<>())); // Null because JPA handles this

            // Assign roles
            applicationUserService.assignRoleToUser("Jeff", "ROLE_USER");
            applicationUserService.assignRoleToUser("Tom", "ROLE_USER");
            applicationUserService.assignRoleToUser("admin", "ROLE_ADMIN");
        };
    }
}
