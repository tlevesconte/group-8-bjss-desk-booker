package com.example.group8officedeskbooking.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserDetailsService userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CustomAuthenticationSuccessHandler authenticationSuccessHandler;


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    public CustomAuthenticationSuccessHandler authenticationSuccessHandlerBean() throws Exception {
        CustomAuthenticationSuccessHandler  customAuthenticationSuccessHandler =new CustomAuthenticationSuccessHandler();
        return customAuthenticationSuccessHandler;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                    .csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/public/**").permitAll()
                    .antMatchers("/Admin/**").hasRole("ADMIN")
                    .antMatchers("/AdminDashboard/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
                .and().formLogin()
                    .loginPage("/login")
                    .successHandler(authenticationSuccessHandler)
                .and().logout()
                    .logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login?logout")
                    .permitAll()
                .and()
                    .oauth2Login()
                    .loginPage("/login")
                    .permitAll();
    }
}

