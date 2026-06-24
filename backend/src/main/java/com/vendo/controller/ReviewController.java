package com.vendo.controller;

import com.vendo.dto.ReviewRequestDto;
import com.vendo.dto.ReviewResponseDto;
import com.vendo.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<ReviewResponseDto> createReview(
            @PathVariable Long productId,
            @RequestBody ReviewRequestDto reviewRequestDto,
            Principal principal) {

        ReviewResponseDto createdReview = reviewService.createReview(
                productId,
                reviewRequestDto,
                principal.getName());

        return ResponseEntity.status(201).body(createdReview);
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDto>> getReviewsByProduct(
            @PathVariable Long productId) {
        List<ReviewResponseDto> reviews = reviewService.getReviewsByProduct(productId);

        return ResponseEntity.ok(reviews);
    }
}