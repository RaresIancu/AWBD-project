package com.vendo.dto;

import java.util.Set;

public class AuthUserDto {

    private String email;
    private Set<String> roles;

    public AuthUserDto() {
    }

    public AuthUserDto(String email, Set<String> roles) {
        this.email = email;
        this.roles = roles;
    }

    public String getEmail() {
        return email;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}