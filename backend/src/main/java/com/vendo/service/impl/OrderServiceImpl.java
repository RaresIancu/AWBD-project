package com.vendo.service.impl;

import com.vendo.dto.OrderItemRequestDto;
import com.vendo.dto.OrderItemResponseDto;
import com.vendo.dto.OrderRequestDto;
import com.vendo.dto.OrderResponseDto;
import com.vendo.entity.Order;
import com.vendo.entity.OrderItem;
import com.vendo.entity.Product;
import com.vendo.entity.User;
import com.vendo.repository.OrderRepository;
import com.vendo.repository.ProductRepository;
import com.vendo.repository.UserRepository;
import com.vendo.service.OrderService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            ProductRepository productRepository,
            UserRepository userRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public OrderResponseDto createOrder(OrderRequestDto request, String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();

        Order order = new Order();
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("CREATED");
        order.setUser(user);

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalPrice = BigDecimal.ZERO;

        for (OrderItemRequestDto itemRequest : request.getItems()) {
            Optional<Product> productOptional = productRepository.findById(itemRequest.getProductId());

            if (productOptional.isEmpty()) {
                throw new RuntimeException("Product not found");
            }

            Product product = productOptional.get();

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(product.getPrice());
            orderItem.setOrder(order);

            orderItems.add(orderItem);

            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);
        }

        order.setItems(orderItems);
        order.setTotalPrice(totalPrice);

        Order savedOrder = orderRepository.save(order);

        return mapToResponse(savedOrder);
    }

    @Override
    public List<OrderResponseDto> getMyOrders(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        List<Order> orders = orderRepository.findByUser(userOptional.get());

        List<OrderResponseDto> response = new ArrayList<>();

        for (Order order : orders) {
            response.add(mapToResponse(order));
        }

        return response;
    }

    private OrderResponseDto mapToResponse(Order order) {
        List<OrderItemResponseDto> itemResponses = new ArrayList<>();

        for (OrderItem item : order.getItems()) {
            OrderItemResponseDto itemResponse = new OrderItemResponseDto(
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getQuantity(),
                    item.getPrice()
            );

            itemResponses.add(itemResponse);
        }

        return new OrderResponseDto(
                order.getId(),
                order.getCreatedAt(),
                order.getTotalPrice(),
                order.getStatus(),
                itemResponses
        );
    }
}