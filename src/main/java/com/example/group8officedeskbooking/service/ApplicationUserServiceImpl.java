package com.example.group8officedeskbooking.service;

import com.example.group8officedeskbooking.model.ApplicationRole;
import com.example.group8officedeskbooking.model.ApplicationUser;
import com.example.group8officedeskbooking.repository.RoleRepository;
import com.example.group8officedeskbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor // Lombok creates a constructor and passes the arguments defined below into that constructor (dependency injection)
@Transactional
@Slf4j // For logs
public class ApplicationUserServiceImpl implements ApplicationUserService, UserDetailsService {

    // Communicates with JPA directly, creates queries and queries the database
    private final UserRepository userRepository; // Need to inject the into the class
    private final RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ApplicationUser user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database. Username: {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role ->
                authorities.add(new SimpleGrantedAuthority(role.getName())));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public ApplicationUser saveUser(ApplicationUser user) {
        log.info("Save new user {}", user.getName()); // log (to help understand what is going on)
        return userRepository.save(user);
    }

    @Override
    public ApplicationRole saveRole(ApplicationRole role) {
        log.info("Save new role {}", role.getName()); // log (to help understand what is going on)
        return roleRepository.save(role);
    }

    @Override
    public void assignRoleToUser(String username, String roleName) {
        // REQUIRES VALIDATION LATER ON
        log.info("Assign user {} to role {}", username, roleName); // log (to help understand what is going on)
        ApplicationUser user = userRepository.findByUsername(username);
        ApplicationRole role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public ApplicationUser getUser(String username) {
        log.info("Fetch user {}", username); // log (to help understand what is going on)
        return userRepository.findByUsername(username);
    }

    @Override
    public List<ApplicationUser> getUsers() {
        // SHOULDN'T DISPLAY ALL USERS AT ONCE
        log.info("Fetch all users"); // log (to help understand what is going on)
        return userRepository.findAll();
    }
}
