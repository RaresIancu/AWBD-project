package com.vendo.service;

import com.vendo.dto.ReviewRequestDto;
import com.vendo.dto.ReviewResponseDto;

import java.util.List;

public interface ReviewService {

    ReviewResponseDto createReview(Long productId, ReviewRequestDto reviewRequestDto, String username);

    List<ReviewResponseDto> getReviewsByProduct(Long productId);
}