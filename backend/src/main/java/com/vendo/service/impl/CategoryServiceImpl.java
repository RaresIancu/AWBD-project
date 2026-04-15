package com.vendo.service.impl;

import com.vendo.entity.Category;
import com.vendo.exception.DuplicateResourceException;
import com.vendo.exception.ResourceNotFoundException;
import com.vendo.repository.CategoryRepository;
import com.vendo.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            throw new DuplicateResourceException(
                    "Category with name '" + category.getName() + "' already exists"
            );
        }
        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category with id " + id + " not found"
                ));
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        Category existingCategory = getCategoryById(id);

        if (!existingCategory.getName().equals(category.getName())
                && categoryRepository.existsByName(category.getName())) {
            throw new DuplicateResourceException(
                    "Category with name '" + category.getName() + "' already exists"
            );
        }

        existingCategory.setName(category.getName());
        existingCategory.setDescription(category.getDescription());

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category existingCategory = getCategoryById(id);
        categoryRepository.delete(existingCategory);
    }
}