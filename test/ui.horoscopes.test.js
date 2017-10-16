//Description: test file for ui of Horoscope page
// Date               Author                      Comment
// 04/08/2017         Thi Nguyen                  Create new class
////////////////////////////////////////////////////////////////////
load("/common/common.js")

// Start testing
grouped(["ui","horoscopes","smoke"],function(){
	test("UI testing for Horoscopes Page", function (driver) {
	
	var driver = session.get("driver");
    // Login as Test User 
	var betaHomePage = loginAsTestUser(driver);
	// choose Horoscopes page on Menu
	chooseCategoryOnMenu(driver,"Lifestyle","Horoscopes");
	// Check layout of Horoscopes page
    checkLayout(driver, "specs/horoscopes/description.gspec", ["all", "desktop"]);  
	});
});


