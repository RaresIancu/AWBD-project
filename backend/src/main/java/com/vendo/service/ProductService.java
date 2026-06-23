package com.vendo.service;

import com.vendo.dto.ProductRequestDto;
import com.vendo.dto.ProductResponseDto;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    ProductResponseDto createProduct(ProductRequestDto productRequestDto);

    List<ProductResponseDto> getAllProducts();

    Page<ProductResponseDto> getProductsPaged(
            int page,
            int size,
            String sortBy,
            String direction,
            String search
    );

    ProductResponseDto getProductById(Long id);

    ProductResponseDto updateProduct(Long id, ProductRequestDto productRequestDto);

    void deleteProduct(Long id);
}