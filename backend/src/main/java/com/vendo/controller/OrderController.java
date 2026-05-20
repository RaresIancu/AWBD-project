package com.vendo.controller;

import com.vendo.dto.OrderRequestDto;
import com.vendo.dto.OrderResponseDto;
import com.vendo.service.OrderService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponseDto createOrder(
            @RequestBody OrderRequestDto request,
            Authentication authentication
    ) {
        return orderService.createOrder(
                request,
                authentication.getName()
        );
    }

    @GetMapping("/my")
    public List<OrderResponseDto> getMyOrders(Authentication authentication) {
        System.out.println("AUTH NAME = " + authentication.getName());

        return orderService.getMyOrders(authentication.getName());
}
}