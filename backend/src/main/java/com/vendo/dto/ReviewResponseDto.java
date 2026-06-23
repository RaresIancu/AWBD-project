package com.vendo.dto;

import java.time.LocalDateTime;

public class ReviewResponseDto {

    private Long id;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;
    private String userEmail;

    public ReviewResponseDto() {
    }

    public ReviewResponseDto(Long id, Integer rating, String comment, LocalDateTime createdAt, String userEmail) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.createdAt = createdAt;
        this.userEmail = userEmail;
    }

    public Long getId() { return id; }
    public Integer getRating() { return rating; }
    public String getComment() { return comment; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public String getUserEmail() { return userEmail; }

    public void setId(Long id) { this.id = id; }
    public void setRating(Integer rating) { this.rating = rating; }
    public void setComment(String comment) { this.comment = comment; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
}