package com.example.group8officedeskbooking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

// Map this class as a table in a database (using Spring Data JPA)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Generate id automatically
    private Long id; // Unique user id
    private String name;
    private String username;
    private String password;
    @ManyToMany(fetch = FetchType.EAGER) // Load users in sync with their role(s)
    private Collection<ApplicationRole> roles = new ArrayList<>(); // Give user role(s)
}
