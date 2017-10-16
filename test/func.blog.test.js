load("/common/common.js");


grouped(["func","blog","smoke"],function(){
	test("Blogger Test", function (driver) {
		
		var driver = session.get("driver");
		try {
			
			//var homePage = loginAsTestUser(driver);
			var homePage = new HomePage(driver).waitForIt();
			
			var bloggerName = "TIM BLAIR";
			logged("Navigate to blog and select blogger " + bloggerName, function(){
				console.log("Click menu");
				homePage.menu.click();

				console.log("Select blogger " + bloggerName);
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
					.withDetails("Actual: " + actualBloggerName + ", expected: " + "bac")
					.withAttachment(bloggerName, takeScreenshot(driver));
			}

			// verify that default filter should be LASTEST POSTS, posts should be displayed
			verifyMsg = "Verify that default filter should be LATEST POSTS, posts should be displayed";
			var currentBlogFilter = blogPage.getCurrentBlogFilter();
			var numberOfShowingBlog = blogPage.getNumberOfShowingBlog();
			console.log(verifyMsg);

			if((currentBlogFilter == "LATEST POSTS") && (numberOfShowingBlog > 0)){
				this.report.info(verifyMsg)
			    	.withDetails("Default filter is as expected, there are " + numberOfShowingBlog + " posts.");
			}
			else{
				this.report.error(verifyMsg)
					.withDetails("Actual: " + currentBlogFilter + " and " + numberOfShowingBlog + " posts, expected: LASTEST POSTS and posts shoule be greater than zero.")
					.withAttachment(verifyMsg, takeScreenshot(driver));
			}

			// verify that click show more, more posts are shown
			console.log("Click show more");
			blogPage.clickShowMore();
			verifyMsg = "Verify that click show more, more posts are shown";
			var numberOfShowingBlogWhenClickingShowMore = blogPage.getNumberOfShowingBlog();
			console.log(verifyMsg);
			console.log("\t=> Before clicking show more: " + numberOfShowingBlog + " post shown, after clicking show more: " + numberOfShowingBlogWhenClickingShowMore + " post shown");
			if(numberOfShowingBlogWhenClickingShowMore > numberOfShowingBlog){
				this.report.info(verifyMsg)
			    	.withDetails("More posts are shown as expected, there are " + numberOfShowingBlogWhenClickingShowMore + " posts.");
			}
			else{
				this.report.error(verifyMsg)
					.withDetails("No more post shown when clicking show more")
					.withAttachment(verifyMsg, takeScreenshot(driver));

			}

			// select to fileter by an archived category, verify that posts filtered by selected category, posts should be displayed
			blogPage.filterArchiveBlogPostRandomly();
			verifyMsg = "Filter by archive - " + blogPage.selectedCategory + ", posts should be displayed";
			currentBlogFilter = blogPage.getCurrentBlogFilter();
			numberOfShowingBlog = blogPage.getNumberOfShowingBlog();

			console.log(verifyMsg);
			if((blogPage.getCurrentBlogFilter() == "ARCHIVE " + blogPage.selectedCategory) && (numberOfShowingBlog > 0)){
				this.report.info(verifyMsg)
			    	.withDetails("Filter is as expected, there are " + numberOfShowingBlog + " post");
			}
			else{
				this.report.error(verifyMsg)
					.withDetails("Actual: " + currentBlogFilter + " and " + numberOfShowingBlog + " posts, expected: ARCHIVE " + blogPage.selectedCategory + " and posts should be greater than zero.")
					.withAttachment(verifyMsg, takeScreenshot(driver));
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