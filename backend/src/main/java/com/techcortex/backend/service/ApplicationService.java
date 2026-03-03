package com.techcortex.backend.service;

import com.techcortex.backend.dto.ApplicationRequest;
import com.techcortex.backend.model.Application;
import com.techcortex.backend.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    @Transactional
    public Long submitApplication(ApplicationRequest request) {
        log.info("Processing application for: {}", request.getEmail());
        
        Application app = new Application();
        app.setFullName(request.getFullName());
        app.setEmail(request.getEmail());
        app.setMobile(request.getMobile());
        app.setLocation(request.getLocation());
        app.setCollegeName(request.getCollegeName());
        app.setStatus(request.getStatus());
        app.setCurrentCourse(request.getCurrentCourse());
        app.setCurrentYear(request.getCurrentYear());
        app.setGradYear(request.getGradYear());
        app.setCourses(request.getCourses());
        app.setLearningMode(request.getLearningMode());
        app.setBatchType(request.getBatchType());
        app.setMessage(request.getMessage());
        app.setStudyPartner(request.getStudyPartner());
        app.setReferralSource(request.getReferralSource());
        app.setConsent(request.isConsent());

        Application savedApp = applicationRepository.save(app);
        log.info("Successfully saved application. ID: {}", savedApp.getId());
        return savedApp.getId();
    }
}
