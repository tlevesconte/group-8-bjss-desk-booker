package com.example.group8officedeskbooking.repository;

import com.example.group8officedeskbooking.model.ApplicationRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<ApplicationRole, Long> {
    ApplicationRole findByName(String name); // Spring Data JPA interprets this as a select statement (selects role by role name)
}
