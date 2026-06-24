package com.vendo.service.impl;

import com.vendo.dto.ReviewRequestDto;
import com.vendo.dto.ReviewResponseDto;
import com.vendo.entity.Product;
import com.vendo.entity.Review;
import com.vendo.entity.User;
import com.vendo.repository.ProductRepository;
import com.vendo.repository.ReviewRepository;
import com.vendo.repository.UserRepository;
import com.vendo.service.ReviewService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(
            ReviewRepository reviewRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ReviewResponseDto createReview(
            Long productId,
            ReviewRequestDto request,
            String email) {

        if (request.getRating() == null || request.getRating() < 1 || request.getRating() > 5) {
            throw new RuntimeException("Rating must be between 1 and 5");
        }

        if (request.getComment() == null || request.getComment().trim().isEmpty()) {
            throw new RuntimeException("Comment is required");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Review review = new Review();

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());
        review.setProduct(product);
        review.setUser(user);

        Review savedReview = reviewRepository.save(review);

        return mapToResponse(savedReview);
    }

    @Override
    public List<ReviewResponseDto> getReviewsByProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<Review> reviews = reviewRepository.findByProduct(product);

        List<ReviewResponseDto> response = new ArrayList<>();

        for (Review review : reviews) {
            response.add(mapToResponse(review));
        }

        return response;
    }

    private ReviewResponseDto mapToResponse(
            Review review) {

        return new ReviewResponseDto(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUser().getEmail());
    }
}