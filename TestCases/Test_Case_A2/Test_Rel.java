
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
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Test_Rel{
private static WebDriver driver;
private boolean acceptNextAlert = true;
private static StringBuffer verificationErrors = new StringBuffer();


public static boolean isElementPresent(WebDriver driver, String locator) {
	      try {
	         driver.findElement(By.xpath(locator));
	         return true;
	      } catch (NoSuchElementException e) {
	         return false;
	      }
	   }



	  @Before
	  public void setUp() throws Exception {
		
		  // Init chromedriver
		  //String chromeDriverPath = "/home/runner/work/Tesi-StrumentoGenerale/Tesi-StrumentoGenerale/chromedriver_v94_linux64/chromedriver";
		  //System.setProperty("webdriver.chrome.driver", chromeDriverPath);
		  WebDriverManager.chromedriver().setup();
		  System.setProperty("webdriver.chrome.whitelistedIps", "");
		  ChromeOptions options = new ChromeOptions();
		  options.addArguments("--headless", "--disable-gpu", "--window-size=1920,1200","--no-sandbox","--ignore-certificate-errors");
		  driver = new ChromeDriver(options);  
		  
		  
		  
	    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	  }
  @Test
  public void test_loc_Rel_release_1_1() throws Exception{
    
	driver.get("http://localhost:4200/");
    Thread.sleep(1000);
	driver.findElement(By.xpath("//input[@id='login-username']")).click();
	driver.findElement(By.xpath("//input[@id='login-username']")).clear();
	driver.findElement(By.xpath("//input[@id='login-username']")).sendKeys("odoobnb@gmail.com");
	driver.findElement(By.xpath("//input[@id='login-password']")).click();
	driver.findElement(By.xpath("//input[@id='login-password']")).clear();
	driver.findElement(By.xpath("//input[@id='login-password']")).sendKeys("provaprova92");
	driver.findElement(By.xpath("//button[@id='login-button']")).click();
	

	Thread.sleep(1000);
	driver.get("http://localhost:4200/");
	Thread.sleep(1000);
	driver.get("http://localhost:4200/");

		  
	int N = 0;
	boolean test_elem = isElementPresent(driver, "//a[normalize-space()='Home']");	
	
	while(!test_elem && N< 1000) {
		
		N++;
		driver.get("http://localhost:4200/");
		
		driver.findElement(By.xpath("//input[@id='login-username']")).click();
		driver.findElement(By.xpath("//input[@id='login-username']")).clear();
		driver.findElement(By.xpath("//input[@id='login-username']")).sendKeys("odoobnb@gmail.com");
		driver.findElement(By.xpath("//input[@id='login-password']")).click();
		driver.findElement(By.xpath("//input[@id='login-password']")).clear();
		driver.findElement(By.xpath("//input[@id='login-password']")).sendKeys("provaprova92");
		driver.findElement(By.xpath("//button[@id='login-button']")).click();
	
		f = driver.findElement(By.xpath("//html")).getText();
		System.out.println(f);
		test_elem = isElementPresent(driver, "//a[normalize-space()='Home']");
		System.out.println(test_elem);
		System.out.println("Loop:"+N);
		
	}


	driver.findElement(By.xpath("//a[1][normalize-space()='Browse']")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("//div[1][@class='mb-6 content-spacing']/div[1]/as-category-cover[1]/a[1]/as-media-cover[1]")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("//div[1][@class='content-spacing']/as-playlist-list[1]/div[1]/as-media[1]/a[1]/div[2]/as-media-cover[1]")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("//a[1][normalize-space()='Search']")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("//input[1][normalize-space()='']")).sendKeys("mengoni");
	Thread.sleep(500);
    driver.findElement(By.xpath("//div[1][@class='mb-8']/as-album-track[1]/as-media-table-row[1]/as-track-main-info[1]/div[2]/div[2]/a[1]")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("//div[2][@class='main-view']/as-artist[1]/div[1]/as-artist-top-tracks[1]/as-artist-top-track[2]/as-media-table-row[1]/a[1]")).click();
    Thread.sleep(2000);
    assertEquals("Marco Mengoni",driver.findElement(By.xpath("//div[1][normalize-space()='Marco Mengoni']")).getText());
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
