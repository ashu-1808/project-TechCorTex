package com.techcortex.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String mobile;

    private String location;

    private String collegeName;

    @Column(nullable = false)
    private String status;

    private String currentCourse;

    private String currentYear;

    private String gradYear;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "application_courses", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "course_id")
    private List<String> courses;

    @Column(nullable = false)
    private String learningMode;

    @Column(nullable = false)
    private String batchType;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private String studyPartner;

    @Column(nullable = false)
    private String referralSource;

    @Column(nullable = false)
    private boolean consent;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}
