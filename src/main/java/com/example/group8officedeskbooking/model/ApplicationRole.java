package com.example.group8officedeskbooking.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// Map this class as a table in a database (using Spring Data JPA)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Generate id automatically
    private Long id; // Unique role id
    private String name;
}
