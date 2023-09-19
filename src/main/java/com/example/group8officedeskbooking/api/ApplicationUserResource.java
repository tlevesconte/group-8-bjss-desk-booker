package com.example.group8officedeskbooking.api;

import com.example.group8officedeskbooking.model.ApplicationRole;
import com.example.group8officedeskbooking.model.ApplicationUser;
import com.example.group8officedeskbooking.service.ApplicationUserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor // So we can inject the field below into the constructor
public class ApplicationUserResource {
    private final ApplicationUserService applicationUserService;

    @GetMapping("/username")
    public ResponseEntity<String> getUsername(Authentication authentication) {
        String resBody = authentication.getName();
        HttpHeaders header = new HttpHeaders();
        header.add("username", authentication.getName());
        return new ResponseEntity<String>(resBody, header, HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<ApplicationUser>>getUsers() {
        return ResponseEntity.ok().body(applicationUserService.getUsers());
    }

    @PostMapping("/user/save") // Send post request when you want to create a resource on a server
    public ResponseEntity<ApplicationUser>saveUser(@RequestBody ApplicationUser user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(applicationUserService.saveUser(user));
    }

    @PostMapping("/role/save") // Send post request when you want to create a resource on a server
    public ResponseEntity<ApplicationRole>saveRole(@RequestBody ApplicationRole role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
        return ResponseEntity.created(uri).body(applicationUserService.saveRole(role));
    }

    @PostMapping("/role/assigntouser") // Send post request when you want to create a resource on a server
    public ResponseEntity<?>assignRoleToUser(@RequestBody AssignToUserForm form) {
        applicationUserService.assignRoleToUser(form.getUsername(), form.getRoleName()); //getters from AssignToUserForm
        return ResponseEntity.ok().build();
    }
}

@Data
class AssignToUserForm {
    private String username;
    private String roleName;
}
