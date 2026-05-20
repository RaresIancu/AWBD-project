package com.vendo.dto;

import java.util.List;

public class OrderRequestDto {

    private List<OrderItemRequestDto> items;

    public OrderRequestDto() {
    }

    public OrderRequestDto(List<OrderItemRequestDto> items) {
        this.items = items;
    }

    public List<OrderItemRequestDto> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequestDto> items) {
        this.items = items;
    }
}