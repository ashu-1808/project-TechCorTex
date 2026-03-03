package com.techcortex.backend.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class ApplicationRequest {

    @NotBlank(message = "Full Name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    private String location;
    private String collegeName;

    @NotBlank(message = "Status is required")
    private String status;

    private String currentCourse;
    private String currentYear;
    private String gradYear;

    @NotEmpty(message = "At least one course must be selected")
    private List<String> courses;

    @NotBlank(message = "Learning mode is required")
    private String learningMode;

    @NotBlank(message = "Batch type is required")
    private String batchType;

    @NotBlank(message = "Message is required")
    private String message;

    private String studyPartner;

    @NotBlank(message = "Referral source is required")
    private String referralSource;

    @AssertTrue(message = "Consent must be true")
    private boolean consent;
}
