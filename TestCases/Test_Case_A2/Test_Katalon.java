
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
public class Test_Katalon{
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
  public void test_loc_Katalon_release_1_1() throws Exception{
    
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
    boolean test_elem = isElementPresent(driver, "//a[normalize-space()='Home']");
		  
		  
	int N = 0;
		
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
	
		
	String s = driver.findElement(By.xpath("//html")).getText();
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Search'])[1]/following::a[1]")).click();
	Thread.sleep(500);
	driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='marco'])[1]/following::as-media-cover[1]")).click();
	Thread.sleep(500);
	driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='marco'])[1]/following::as-media-cover[1]")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Home'])[1]/following::a[1]")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='marco'])[1]/following::input[1]")).sendKeys("mengoni");
	Thread.sleep(500);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='Due Vite'])[1]/following::a[1]")).click();
	Thread.sleep(500);
    driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='MATERIA (PELLE)'])[1]/following::a[1]")).click();
    Thread.sleep(2000);
    assertEquals("Marco Mengoni",driver.findElement(By.xpath("(.//*[normalize-space(text()) and normalize-space(.)='MATERIA (TERRA)'])[1]/following::div[3]")).getText());
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
