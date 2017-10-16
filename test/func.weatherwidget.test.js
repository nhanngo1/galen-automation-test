
load("/common/common.js");


grouped(["func","weather","smoke"],function(){
	test("Weather widget test", function (driver) {
		
		var driver = session.get("driver");
		var homePage = new HomePage(driver);

		// get random postal code from json object POSTALCODE
		var obj_keys = Object.keys(POSTALCODE);
        var ran_key = obj_keys[Math.floor(Math.random() * obj_keys.length)];
		var city = POSTALCODE[ran_key];
		
		logged("Get weather info", function(){
			console.log("Click menu");
			homePage.menu.click();
			GalenPages.sleep(1000);

			console.log("Enter postal code ");
			homePage.getWeather(ran_key);
			homePage.weather_city.waitToBeShown("10s");
		});

		var dt = new Date();
		var screenshot = takeScreenshot(driver);
		var isResultPassed = true;
		var errMsg = "";

		// verify location
		var verifyMsg = "Verify that location is correct"
		var weatherCityActual = homePage.weather_city.getText()
		errMsg = "City is " + weatherCityActual + ". Expected: " + city;
		console.log(verifyMsg);
		isResultPassed = (weatherCityActual == city);
		updateTestResult(driver, this.report, isResultPassed, verifyMsg, errMsg);

		// verify weather header
		verifyMsg = "Verify that weather detail is retrieved successfully";
		errMsg = "Failed to get weather header";
		console.log(verifyMsg);
		var weartherHeader = homePage.weather_header.getText();
		isResultPassed = ((weartherHeader !== 'undefined') && (weartherHeader !== ""));
		updateTestResult(driver, this.report, isResultPassed, verifyMsg, errMsg);

		// verify weather forecast
		verifyMsg = "Verify that weather forecast is retrieved successfully";
		errMsg = "Failed to get weather forecast";
		console.log(verifyMsg);
		var weartherForecast = homePage.weather_forecast.getText();
		isResultPassed = ((weartherForecast !== 'undefined') && (weartherForecast !== ""));
		updateTestResult(driver, this.report, isResultPassed, verifyMsg, errMsg);

		updateReport();
	})
});