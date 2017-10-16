this.HoroscopesPage = $page("Horoscopes page",{
	zodiac : ".tge-horoscope-zodiac"
    },{
    	openZodiacSection: function(){
			var driver = session.get("driver");
			inject(driver,"var a = document.querySelector('div[class="+"tge-horoscope-zodiac_top"+"]');a.click();");
			console.log("Click to Zodiac");
			return HoroscopesPage(driver);
		},
		scrollPage: function(){
			var driver = session.get("driver");
			inject(driver,"window.scrollTo(300, 500);");
			console.log("Click to scroll");
		},
		zodiacDescription : ".tge-horoscope-zodiac--open"
});