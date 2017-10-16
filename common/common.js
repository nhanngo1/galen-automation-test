load("/page/LoginPage.js");
load("/page/HomePage.js");
load("/page/BlogPage.js");


var POSTALCODE = {
    "2000": "SYDNEY",
    "2006": "THE UNIVERSITY OF SYDNEY",
    "2017": "WATERLOO"
};

var TEST_RESULT = {
    error: 0,
    message: ""
}

var URL = 'http://www.dailytelegraph.com.au';

beforeTest(function (testInfo) {
    var driver = createDriver(URL, "1400x900", "chrome");
    session.put("driver",driver);
            
});

afterTest(function (testInfo) 
{
    //console.log(testInfo.name);
    var driver = session.get("driver");
    driver.quit();
});

(function (export) {
    export.TEST_USER = TEST_USER;
    export.URL = URL;
    export.POSTALCODE = POSTALCODE;
    export.TEST_RESULT = TEST_RESULT;
})(this);

function updateReport() {

    if(TEST_RESULT.error > 0){
        var msg = "There are " + TEST_RESULT.error + " error found: " + TEST_RESULT.message;
        TEST_RESULT.error = 0;
        TEST_RESULT.message = "";
        throw new Error(msg);
    }
}

function updateTestResult(driver, report, result, verifyMsg, failMsg) {

    var dt = new Date();
    var screenshot = takeScreenshot(driver);
    if(result){
        report.info(verifyMsg)
            .withExtrasImage(dt, screenshot);
    }
    else{
        TEST_RESULT.error += 1;
        TEST_RESULT.message += "\n" + failMsg;
        report.error(verifyMsg)
            .withDetails(failMsg)
            .withAttachment(verifyMsg, screenshot);
    }

}

function getRandomIntInclusive(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;  
}

function loginAsTestUser(driver) {
      
    var homePage = new HomePage(driver).waitForIt();
    
    console.log("Click login home page");
    homePage.clickLoginButton();

    console.log("Login");
    var loginPage = new LoginPage(driver).waitForIt();;
    loginPage.loginAsTestUser(TEST_USER);

    return new HomePage(driver).waitForIt();
}

// Choose category on menu
function chooseCategoryOnMenu(driver,section, childSection){

    var pageName = childSection;
    var betaHomePage = new BetaHomePage(driver);
        betaHomePage.menu.click();
        GalenPages.sleep(3000);
        console.log("Click on Menu");
        scrollMenuBar(driver);
		logged("Navigate to Beta and select  " + childSection, function(){
			betaHomePage.selectedMenuItem(section, childSection);
		});
}
//Scroll Page
function scrollPage(driver){

	inject(driver,"window.scrollTo(300, 500);");
	console.log("Click to scroll");
}

function scrollMenuBar(driver){

    var divMenuBar = "tge-headerv2-drawer "
    inject(driver," var menuBar = document.querySelector('.tge-headerv2-drawer_inner'); menuBar.scrollTop = 500;");
    console.log("Click to scroll Menu Bar");
}