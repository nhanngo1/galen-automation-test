load("/common/common.js");

var refreshTime = 700;
grouped(["nopost"],function(){
	test("TIM BLAIR's post test", function (driver) {
		
		var driver = session.get("driver");
		try {

			var homePage = new HomePage(driver);
			var bloggerName = "TIM BLAIR";
			logged("Navigate to blog and select blogger " + bloggerName, function(){
				console.log("Click menu");
				homePage.menu.click();

				console.log("Select blogger " + bloggerName);
				//blogPage = betaHomePage.selectBlogger(bloggerName).waitForIt();
				homePage.selectedMenuItem("blogs", bloggerName)
			});

			var blogPage = new BlogPage(driver);
			// verify bloger name
			var actualBloggerName = blogPage.getBloggerName();
			var verifyMsg = "Verify that bloger name is " + bloggerName;
			console.log(verifyMsg);

			if(bloggerName == actualBloggerName){
				this.report.info(verifyMsg)
			    	.withDetails("Blogger name is as expected.");
			}
			else{
				this.report.error(verifyMsg)
					.withDetails("Actual: " + actualBloggerName + ", expected: " + bloggerName)
					.withAttachment(bloggerName, takeScreenshot(driver));
			}

			// verify that default filter should be LASTEST POSTS, posts should be displayed
			var error = 0;
			for(i = 0; i< refreshTime; i++)
			{
				verifyMsg = bloggerName + " - Verify that default filter should be LATEST POSTS, posts should be displayed";
				var currentBlogFilter = blogPage.getCurrentBlogFilter();
				var numberOfShowingBlog = blogPage.getNumberOfShowingBlog();
				console.log(verifyMsg);

				var dt = new Date();
				var screenshot = takeScreenshot(driver);
				if((currentBlogFilter == "LATEST POSTS") && (numberOfShowingBlog > 0)){
					this.report.info(verifyMsg)
				    	.withDetails("Default filter is as expected, there are " + numberOfShowingBlog + " posts.")
				    	.withExtrasImage(dt, screenshot);
				}
				else{
					error++;
					this.report.error(verifyMsg)
						.withDetails("Actual: " + currentBlogFilter + " and " + numberOfShowingBlog + " posts, expected: LASTEST POSTS and posts shoule be greater than zero.")
						.withAttachment(dt, screenshot).withExtrasImage(dt, screenshot);
				}

				GalenPages.sleep(50000); // refresh the page each 50s
				console.log(bloggerName + " - " +dt+": Refresh page - " + i + "/" + refreshTime + "; Error found: " + error);
				driver.navigate().refresh();
			}
		}
		catch(err){
			var msg = "Exception message: " + err.message + "\nStack trace: " + err.stack;
			console.log("===> " + msg);
			this.report.error(msg)
		    .withAttachment("BloggerTestException", takeScreenshot(driver));
		}
	})
});