package com.vendo.dto;

import java.math.BigDecimal;
import java.util.Set;

public class ProductResponseDto {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private String imageUrl;
    private Set<CategorySummaryDto> categories;

    public ProductResponseDto() {
    }

    public ProductResponseDto(Long id, String name, String description, BigDecimal price,
                              Integer stock, String imageUrl, Set<CategorySummaryDto> categories) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Set<CategorySummaryDto> getCategories() {
        return categories;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setCategories(Set<CategorySummaryDto> categories) {
        this.categories = categories;
    }
}