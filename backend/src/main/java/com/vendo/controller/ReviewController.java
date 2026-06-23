package com.vendo.controller;

import com.vendo.dto.ReviewRequestDto;
import com.vendo.dto.ReviewResponseDto;
import com.vendo.service.ReviewService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products/{productId}/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ReviewResponseDto createReview(
            @PathVariable Long productId,
            @RequestBody ReviewRequestDto request,
            Authentication authentication
    ) {
        return reviewService.createReview(
                productId,
                request,
                authentication.getName()
        );
    }

    @GetMapping
    public List<ReviewResponseDto> getReviewsForProduct(
            @PathVariable Long productId
    ) {
        return reviewService.getReviewsForProduct(productId);
    }
}