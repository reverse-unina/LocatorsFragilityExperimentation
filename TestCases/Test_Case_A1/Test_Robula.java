
//File risulta attualmente aggiornato per webdriver chrome headless!
package com.example.TesiIntegrazioneProgettoEsterno;

import java.util.concurrent.TimeUnit;

import org.junit.*;

import static org.junit.Assert.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.chrome.ChromeOptions;

public class Test_Robula{
private static WebDriver driver;
private boolean acceptNextAlert = true;
private static StringBuffer verificationErrors = new StringBuffer();

	  @Before
	  public void setUp() throws Exception {
		
		  // Init chromedriver
		  //String chromeDriverPath = "/home/runner/work/HookTestRepo/HookTestRepo/chromedriver_v94_linux64/chromedriver";
		  //System.setProperty("webdriver.chrome.driver", chromeDriverPath);
		  WebDriverManager.chromedriver().setup();
		  System.setProperty("webdriver.chrome.whitelistedIps", "");
		  ChromeOptions options = new ChromeOptions();
		  options.addArguments("--headless", "--disable-gpu", "--window-size=1920,1200","--no-sandbox","--ignore-certificate-errors");
		  driver = new ChromeDriver(options);  
		  
		  
		  
	    driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);
	  }
  @Test
  public void test_loc_Robula_release_1_1() throws Exception{
    driver.get("http://localhost:3001/");
    Thread.sleep(3500);
    driver.findElement(By.xpath("//input[@formcontrolname='firstName']")).click();
    driver.findElement(By.xpath("//input[@formcontrolname='firstName']")).clear();
    driver.findElement(By.xpath("//input[@formcontrolname='firstName']")).sendKeys("Marco");
    driver.findElement(By.xpath("//input[@formcontrolname='lastName']")).click();
    driver.findElement(By.xpath("//input[@formcontrolname='lastName']")).clear();
    driver.findElement(By.xpath("//input[@formcontrolname='lastName']")).sendKeys("De Luca");
    driver.findElement(By.xpath("//input[@formcontrolname='email']")).click();
    driver.findElement(By.xpath("//input[@formcontrolname='email']")).clear();
    driver.findElement(By.xpath("//input[@formcontrolname='email']")).sendKeys("ciao@ciao.it");
    driver.findElement(By.xpath("//button[@type='submit']")).click();
	Thread.sleep(3500);
    assertEquals("4",driver.findElement(By.xpath("//div[@class='number']")).getText());
    driver.findElement(By.xpath("//button[@class='btn btn-warning']")).click();
    Thread.sleep(3500);
    assertEquals("Marco",driver.findElement(By.xpath("//tr[4]/td[2]")).getText());
  }


 @After
	  public void tearDown() throws Exception {
	    driver.quit();
	    String verificationErrorString = verificationErrors.toString();
	    if (!"".equals(verificationErrorString)) {
	      fail(verificationErrorString);
	    }
	  }

	  private boolean isElementPresent(By by) {
	    try {
	      driver.findElement(by);
	      return true;
	    } catch (NoSuchElementException e) {
	      return false;
	    }
	  }

	  private boolean isAlertPresent() {
	    try {
	      driver.switchTo().alert();
	      return true;
	    } catch (NoAlertPresentException e) {
	      return false;
	    }
	  }

	  private String closeAlertAndGetItsText() {
	    try {
	      Alert alert = driver.switchTo().alert();
	      String alertText = alert.getText();
	      if (acceptNextAlert) {
	        alert.accept();
	      } else {
	        alert.dismiss();
	      }
	      return alertText;
	    } finally {
	      acceptNextAlert = true;
	    }
	  }

}
