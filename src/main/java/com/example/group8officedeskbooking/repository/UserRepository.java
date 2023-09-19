package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<ApplicationUser, Long> {
    ApplicationUser findByUsername(String username); // Spring Data JPA interprets this as a select statement (selects user by username)
}
