package com.vendo.service.impl;

import com.vendo.dto.AuthResponseDto;
import com.vendo.dto.RegisterRequestDto;
import com.vendo.entity.Role;
import com.vendo.entity.User;
import com.vendo.entity.UserProfile;
import com.vendo.exception.DuplicateResourceException;
import com.vendo.repository.RoleRepository;
import com.vendo.repository.UserRepository;
import com.vendo.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AuthResponseDto register(RegisterRequestDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("User with email '" + request.getEmail() + "' already exists");
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName("ROLE_USER");
                    return roleRepository.save(role);
                });

        UserProfile profile = new UserProfile();

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        user.setRoles(Set.of(userRole));
        user.setProfile(profile);

        User savedUser = userRepository.save(user);

        return new AuthResponseDto(savedUser.getId(), savedUser.getEmail(), "User registered successfully");
    }
}