//Description: test file for ui of Horoscope page
// Date               Author                      Comment
// 04/08/2017         Thi Nguyen                  Create new class
////////////////////////////////////////////////////////////////////
load("/common/common.js")

// Start testing
grouped(["ui","blogs","smoke"],function(){
	test("UI testing for Blogs Page", function (driver) {
	
	var driver = session.get("driver");
	driver.get("http://www.dailytelegraph.com.au/blogs/tim-blair");
    checkLayout(driver, "specs/blogs/blogs.gspec", ["all", "desktop"]);  
	});
});
