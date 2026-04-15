package com.vendo.service.impl;

import com.vendo.dto.CategorySummaryDto;
import com.vendo.dto.ProductRequestDto;
import com.vendo.dto.ProductResponseDto;
import com.vendo.entity.Category;
import com.vendo.entity.Product;
import com.vendo.exception.DuplicateResourceException;
import com.vendo.exception.ResourceNotFoundException;
import com.vendo.repository.CategoryRepository;
import com.vendo.repository.ProductRepository;
import com.vendo.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponseDto createProduct(ProductRequestDto productRequestDto) {
        if (productRepository.existsByName(productRequestDto.getName())) {
            throw new DuplicateResourceException(
                    "Product with name '" + productRequestDto.getName() + "' already exists"
            );
        }

        Set<Category> categories = getCategoriesByIds(productRequestDto.getCategoryIds());

        Product product = new Product();
        product.setName(productRequestDto.getName());
        product.setDescription(productRequestDto.getDescription());
        product.setPrice(productRequestDto.getPrice());
        product.setStock(productRequestDto.getStock());
        product.setImageUrl(productRequestDto.getImageUrl());
        product.setCategories(categories);

        Product savedProduct = productRepository.save(product);
        return mapToResponseDto(savedProduct);
    }

    @Override
    public List<ProductResponseDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product with id " + id + " not found"
                ));

        return mapToResponseDto(product);
    }

    @Override
    public ProductResponseDto updateProduct(Long id, ProductRequestDto productRequestDto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product with id " + id + " not found"
                ));

        if (!existingProduct.getName().equals(productRequestDto.getName())
                && productRepository.existsByName(productRequestDto.getName())) {
            throw new DuplicateResourceException(
                    "Product with name '" + productRequestDto.getName() + "' already exists"
            );
        }

        Set<Category> categories = getCategoriesByIds(productRequestDto.getCategoryIds());

        existingProduct.setName(productRequestDto.getName());
        existingProduct.setDescription(productRequestDto.getDescription());
        existingProduct.setPrice(productRequestDto.getPrice());
        existingProduct.setStock(productRequestDto.getStock());
        existingProduct.setImageUrl(productRequestDto.getImageUrl());
        existingProduct.setCategories(categories);

        Product updatedProduct = productRepository.save(existingProduct);
        return mapToResponseDto(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product with id " + id + " not found"
                ));

        productRepository.delete(existingProduct);
    }

    private Set<Category> getCategoriesByIds(Set<Long> categoryIds) {
        Set<Category> categories = categoryRepository.findAllById(categoryIds)
                .stream()
                .collect(Collectors.toSet());

        if (categories.size() != categoryIds.size()) {
            throw new ResourceNotFoundException("One or more categories were not found");
        }

        return categories;
    }

    private ProductResponseDto mapToResponseDto(Product product) {
        Set<CategorySummaryDto> categoryDtos = product.getCategories()
                .stream()
                .map(category -> new CategorySummaryDto(category.getId(), category.getName()))
                .collect(Collectors.toSet());

        return new ProductResponseDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getImageUrl(),
                categoryDtos
        );
    }
}