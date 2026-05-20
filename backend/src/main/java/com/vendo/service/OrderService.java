package com.vendo.service;

import com.vendo.dto.OrderRequestDto;
import com.vendo.dto.OrderResponseDto;

import java.util.List;

public interface OrderService {

    OrderResponseDto createOrder(OrderRequestDto request, String email);

    List<OrderResponseDto> getMyOrders(String email);
}