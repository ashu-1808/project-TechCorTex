package com.techcortex.qa;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.Random;

public class FormFiller {

    private static final Logger log = LoggerFactory.getLogger(FormFiller.class);
    private static final Random random = new Random();
    private static final String APP_URL = "http://localhost:3000/#/apply";
    private static final String HOME_URL = "http://localhost:3000/";

    private static final String[] FIRST_NAMES = {"James", "Emma", "Liam", "Olivia", "Noah", "Ava", "William", "Sophia", "Mason", "Isabella"};
    private static final String[] LAST_NAMES = {"Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin"};
    private static final String[] CITIES = {"New York", "London", "Bangalore", "San Francisco", "Berlin", "Toronto", "Sydney", "Mumbai", "Paris", "Tokyo"};
    
    // Checkbox values based on ApplicationPage.tsx
    private static final String[] COURSES = {
        "cloud-computing", "devops", "aiml-deeplearning", 
        "fullstack-java-python", "mean-mern", "ai-integrations", 
        "webapp-dev", "industry-project-1", "industry-project-2"
    };

    public static void main(String[] args) {
        log.info("Setting up ChromeDriver...");
        WebDriverManager.chromedriver().setup();
        WebDriver driver = new ChromeDriver();
        
        try {
            driver.manage().window().maximize();
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            
            // Start at Home Page
            driver.get(HOME_URL);

            for (int i = 1; i <= 5; i++) {
                log.info("Starting User Journey #{}", i);
                performUserJourney(driver, wait, i);
                Thread.sleep(1000); 
            }
            
            log.info("Completed 5 full user journeys successfully!");

        } catch (Exception e) {
            log.error("Test failed", e);
        } finally {
            driver.quit();
        }
    }

    private static void performUserJourney(WebDriver driver, WebDriverWait wait, int index) throws InterruptedException {
        // 1. Navigate to Apply Page (if not already there)
        if (!driver.getCurrentUrl().contains("apply")) {
            try {
                WebElement applyLink = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//a[contains(@href, 'apply')]")));
                applyLink.click();
            } catch (Exception e) {
                driver.get(APP_URL);
            }
        }

        // 2. Fill Form
        WebElement fullNameInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("fullName")));
        
        String firstName = getRandom(FIRST_NAMES);
        String lastName = getRandom(LAST_NAMES);
        String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + index + "@example.com";
        String mobile = "+1 555 010 " + (1000 + index);

        fullNameInput.sendKeys(firstName + " " + lastName);
        driver.findElement(By.name("mobile")).sendKeys(mobile);
        driver.findElement(By.name("email")).sendKeys(email);
        driver.findElement(By.name("location")).sendKeys(getRandom(CITIES));

        Select statusSelect = new Select(driver.findElement(By.name("status")));
        String status = getRandom(new String[]{"Student", "Fresher (Graduated)", "Working Professional", "Career Switcher"});
        statusSelect.selectByVisibleText(status);

        if ("Student".equals(status)) {
            WebElement collegeInput = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("collegeName")));
            collegeInput.sendKeys("University of Tech");
        }
        
        driver.findElement(By.name("currentCourse")).sendKeys("B.Tech CS");
        driver.findElement(By.name("currentYear")).sendKeys("4th Year");
        driver.findElement(By.name("gradYear")).sendKeys("2025");

        String randomCourse = getRandom(COURSES);
        WebElement courseCheckbox = driver.findElement(By.cssSelector("input[value='" + randomCourse + "']"));
        if (!courseCheckbox.isSelected()) {
            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", courseCheckbox);
        }

        Select modeSelect = new Select(driver.findElement(By.name("learningMode")));
        modeSelect.selectByIndex(1 + random.nextInt(3)); 

        Select batchSelect = new Select(driver.findElement(By.name("batchType")));
        batchSelect.selectByIndex(1 + random.nextInt(2)); 

        driver.findElement(By.name("message")).sendKeys("Automated User Journey #" + index);
        
        Select referralSelect = new Select(driver.findElement(By.name("referralSource")));
        referralSelect.selectByIndex(1 + random.nextInt(4));

        WebElement consentCheckbox = driver.findElement(By.name("consent"));
        if (!consentCheckbox.isSelected()) {
             ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", consentCheckbox);
        }

        // 3. Submit
        WebElement submitBtn = driver.findElement(By.cssSelector("button[type='submit']"));
        ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", submitBtn);

        // 4. Verify Success & Navigate
        try {
            // Wait for Form to disappear (Success state)
            wait.until(ExpectedConditions.invisibilityOf(fullNameInput));
            
            // 5. Click 'Back to Base' (Home)
            WebElement backButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Back to Base')]")));
            log.info("Journey #{}: Success Screen Verified. Waiting 5s for inspection...", index);
            
            // Pause for visual inspection as requested
            Thread.sleep(5000);
            
            ((org.openqa.selenium.JavascriptExecutor) driver).executeScript("arguments[0].click();", backButton);
            
            // 6. Verify we are back Home
            wait.until(ExpectedConditions.not(ExpectedConditions.urlContains("apply")));
            log.info("Journey #{}: Returned to Home Page.", index);

        } catch (Exception e) {
             log.error("Journey #{} Failed at Success/Navigation step.", index);
             try {
                String source = driver.getPageSource();
                log.error("Page Source Snippet (First 2000 chars):\n{}", source.substring(0, Math.min(source.length(), 2000)));
             } catch (Exception ignore) {}
             throw e;
        }
    }

    private static String getRandom(String[] array) {
        return array[random.nextInt(array.length)];
    }
}
