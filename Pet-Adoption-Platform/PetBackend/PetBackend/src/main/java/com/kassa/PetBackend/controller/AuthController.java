package com.kassa.PetBackend.controller;



import com.kassa.PetBackend.dto.AuthRequest;
import com.kassa.PetBackend.dto.AuthResponse;
import com.kassa.PetBackend.entity.User;
import com.kassa.PetBackend.repo.UserRepository;
import com.kassa.PetBackend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setRole(User.Role.valueOf(request.getRole()));
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        
        userRepository.save(user);
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());
        
        return ResponseEntity.ok(new AuthResponse(token, token, user.getId(), user.getEmail(), 
                                 user.getName(), user.getRole().toString()));
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());
        
        return ResponseEntity.ok(new AuthResponse(token, token, user.getId(), user.getEmail(), 
                                 user.getName(), user.getRole().toString()));
    }
}