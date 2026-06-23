package com.vendo.service;

import com.vendo.dto.ReviewRequestDto;
import com.vendo.dto.ReviewResponseDto;

import java.util.List;

public interface ReviewService {

    ReviewResponseDto createReview(Long productId, ReviewRequestDto request, String email);

    List<ReviewResponseDto> getReviewsForProduct(Long productId);
}