package com.vendo.service;

import com.vendo.dto.AuthResponseDto;
import com.vendo.dto.RegisterRequestDto;

public interface AuthService {
    AuthResponseDto register(RegisterRequestDto request);
}