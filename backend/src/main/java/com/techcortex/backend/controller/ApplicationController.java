package com.techcortex.backend.controller;

import com.techcortex.backend.dto.ApiResponse;
import com.techcortex.backend.dto.ApplicationRequest;
import com.techcortex.backend.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173"}) // specific trusted origins
@RequiredArgsConstructor
@Slf4j
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<Map<String, Long>>> submitApplication(@Valid @RequestBody ApplicationRequest request) {
        log.info("Received application request from: {}", request.getEmail());
        Long applicationId = applicationService.submitApplication(request);
        return new ResponseEntity<>(
                new ApiResponse<>(true, "Application submitted successfully.", Map.of("applicationId", applicationId)),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("TechCortex Backend is running!");
    }
}
