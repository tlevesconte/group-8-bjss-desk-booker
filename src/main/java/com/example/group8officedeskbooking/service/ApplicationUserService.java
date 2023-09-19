package com.example.group8officedeskbooking.service;

import com.example.group8officedeskbooking.model.ApplicationRole;
import com.example.group8officedeskbooking.model.ApplicationUser;

import java.util.List;

/**
 * Defines all methods used in the application
  */
public interface ApplicationUserService {
    ApplicationUser saveUser(ApplicationUser user); // Store user in database
    ApplicationRole saveRole(ApplicationRole role); // Store role in database
    void assignRoleToUser(String username, String roleName); // Assign a role to a specific username
    ApplicationUser getUser(String username); // Retrieve username (the assumption is that all usernames will be unique)
    List<ApplicationUser>getUsers(); // CHANGE THIS (LOAD N NUM. OF USERS INSTEAD)
}
