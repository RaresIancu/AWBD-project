package com.vendo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;

    private String address;

    private String city;

    private String country;

    private String zipCode;

    public UserProfile() {
    }

    public UserProfile(Long id, String phone, String address,
                       String city, String country, String zipCode) {
        this.id = id;
        this.phone = phone;
        this.address = address;
        this.city = city;
        this.country = country;
        this.zipCode = zipCode;
    }

    public Long getId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getCountry() {
        return country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }
}