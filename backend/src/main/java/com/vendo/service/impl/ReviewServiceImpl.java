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
import java.util.Optional;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ReviewServiceImpl(
            ReviewRepository reviewRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ReviewResponseDto createReview(Long productId, ReviewRequestDto request, String email) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Review review = new Review();
        review.setProduct(productOptional.get());
        review.setUser(userOptional.get());
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);

        return mapToResponse(savedReview);
    }

    @Override
    public List<ReviewResponseDto> getReviewsForProduct(Long productId) {
        Optional<Product> productOptional = productRepository.findById(productId);

        if (productOptional.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        List<Review> reviews = reviewRepository.findByProduct(productOptional.get());

        List<ReviewResponseDto> response = new ArrayList<>();

        for (Review review : reviews) {
            response.add(mapToResponse(review));
        }

        return response;
    }

    private ReviewResponseDto mapToResponse(Review review) {
        return new ReviewResponseDto(
                review.getId(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUser().getEmail()
        );
    }
}