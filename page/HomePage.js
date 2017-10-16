
this.HomePage = $page("Home page",{
        
        menu: ".tgc-headerv2-blackbar_menu"
    },{
    	loginButton: ".tgc-auth-buttons_button.tgc-auth-buttons_login",
		postalCodeInput: ".tge-weather-postcode_form-input",
		goButton: "button.tge-button",
		menuCloseButton: "div.tge-headerv2-drawer_close-button",
        weather_city: "div.tge-weather-detail_city",
        weather_header: "div.tge-weather-detail_header",
        weather_forecast: "div.tge-weather-detail_forecast-items",

		// Get Blogger Name 
    	getBloggerName: function(){
    		var driver = session.get("driver");
    		var el = inject(driver, "return document.querySelector('.tge-blogger-identity_name_text')");
    		var txt = el.getText();
    		return txt;
		},
		
		// select menu item
		// section : section on Menu (ex : Lifestyle)
		// child section  : section of subcategory (ex : Horoscopes)
		selectedMenuItem : function(section,childSection){
			// TODO : select Horoscopes on Menu
			var driver = session.get("driver");
			// Convert section and childSection into lower case
			section = section.toLowerCase();
			childSection = childSection.toLowerCase();
			// Replace blank space between 2 words into "-"
			childSection = childSection.replace(" ","-");
			var itemChoose = '"http://www.dailytelegraph.com.au/' + section +"/" +childSection +'"';
			//console.log(itemChoose);
			inject(driver, "var a = document.querySelector('a[href="+itemChoose+"]'); a.click()")
		},

		clickLoginButton: function(){
        	var driver = session.get("driver");
        	inject(driver, "document.querySelector('.tgc-auth-buttons_button.tgc-auth-buttons_login').click()");
        
        },

        getWeather: function(postalCode){
        	var driver = session.get("driver");
        	var changeLocationButton = inject(driver, "return document.querySelectorAll('button.tge-button')[1]");

        	if(this.postalCodeInput.isDisplayed() === false)
        		changeLocationButton.click();

        	this.postalCodeInput.waitToBeShown("10s");
    		this.postalCodeInput.typeText(postalCode);
        	this.goButton.click();
        }
	}
);