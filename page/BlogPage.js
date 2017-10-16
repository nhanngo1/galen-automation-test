this.BlogPage = $page("Blog page",{
        returnToClassicVersion: "#BetaBar",
        bloggerName: ".tge-blogger-identity_name_text",
        showAll: ".tgc-tag-list_main-link_text",
        categories: ".tge-tag_wrapper"
    },{
        selectedCategory: "", // selectedCategory will be updated whenever filterBlogPostByCategoryIndex() is executed
        loadingIcon: "svg.uil-default",
        selectedArticalTitle: "",
        selectedArticalIndex: "",

        getBloggerName: function(){
            return this.bloggerName.getText();
        },

        getSelectedCategory: function(){
            var driver = session.get("driver");
            return inject(driver, "return document.querySelector('.tge-componenttitle_tag_text');").getText();
        },

        getCurrentBlogFilter: function(){
            var driver = session.get("driver");
            var filteredBy = inject(driver, "var a = document.querySelectorAll('.tge-componenttitle_text'); return a[0];");
            if((filteredBy.getText() == "FILTERED BY") || (filteredBy.getText() == "ARCHIVE")){
                //console.log("filter: " + filteredBy.getText() + "|" + selectedCategory.getText());
                return filteredBy.getText() + " " + this.getSelectedCategory();
            }
            //console.log("filter: " + filteredBy.getText());
            return filteredBy.getText();
        },

        getNumberOfShowingBlog: function(){
            var driver = session.get("driver");
            var postedBlog = inject(driver, "return document.querySelectorAll('h2.tge-cardv2_title').length");
            return postedBlog;
        },

        waitingForFilteringPosts: function() {
            var driver = session.get("driver");
            var waitingForPageLoad = 30;
            var newCategory = inject(driver, "return document.querySelector('.tge-componenttitle_tag_text');").getText();
            while(newCategory != this.selectedCategory && waitingForPageLoad > 0){
                GalenPages.sleep(1000);
                waitingForPageLoad--;
            }
        },

        filterBlogPostByCategoryIndex: function(categoryIndex){
            var driver = session.get("driver");
            inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); a[" + categoryIndex + "].click();");
            this.selectedCategory = inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); return a[" + categoryIndex + "].querySelector('.tge-tag_title_text').innerText;");
            //console.log("selectedCategory: " + this.selectedCategory);
            
            this.waitingForFilteringPosts();
        },

        filterArchiveBlogPostByCategoryIndex: function(categoryIndex){
            var driver = session.get("driver");
            var totalItems = inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); return a.length");
            categoryIndex = totalItems - categoryIndex;
            inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); a[" + categoryIndex + "].click();");
            this.selectedCategory = inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); return a[" + categoryIndex + "].querySelector('.tge-tag_title_text').innerText;");
            //console.log("selectedCategory: " + this.selectedCategory);
            
            this.waitingForFilteringPosts();
        },

        filterArchiveBlogPostRandomly: function(){
            var driver = session.get("driver");
            var totalItems = inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); return a.length");
            var categoryIndex = getRandomIntInclusive(0, totalItems - 1);
            inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); a[" + categoryIndex + "].click();");
            this.selectedCategory = inject(driver, "var a = document.querySelectorAll('a.tge-tag_wrapper'); return a[" + categoryIndex + "].querySelector('.tge-tag_title_text').innerText;");
            //console.log("selectedCategory: " + this.selectedCategory);
            
            this.waitingForFilteringPosts();
        },

        selectShowAll: function(){
            var driver = session.get("driver");
            var showAll = inject(driver, "return document.querySelector('.tgc-tag-list_main-link_text');");
            showAll.click();
        },

        clickShowMore: function(){
            var driver = session.get("driver");
            inject(driver, "var showMore = document.querySelectorAll('button.tge-button')[2]; showMore.scrollIntoView(); showMore.click();");

            //inject(driver, "document.querySelectorAll('button.tge-button')[2].click();");
            try{
                while(this.loadingIcon.isDisplayed()){
                    GalenPages.sleep(1000);
                }
            }
            catch(err){}
        },

        selectFilterTab: function(tabName){
            var driver = session.get("driver");
            var index;

            if(tabName.toLowerCase() == "categories")
                index = 1;
            else if (tabName.toLowerCase() == "archives")
                index = 2;
            inject(driver, "var a = document.querySelectorAll('div.tgc-filters_tabs div'); return a[" + index + "].click()");
            GalenPages.sleep(2000);
        },

        selectAnArticalByIndex: function(articalIndex){
            var driver = session.get("driver");
            var totalArtical = inject(driver, "var a = document.querySelectorAll('h2.tge-cardv2_title').length;");
            if(articalIndex >= totalArtical)
                articalIndex = totalArtical - 1;
            else if(articalIndex < 0)
                articalIndex = 0;
            this.selectedArticalIndex = articalIndex;
            this.selectedArticalTitle = inject(driver, "var a = document.querySelectorAll('h2.tge-cardv2_title'); a[" + articalIndex + "].click(); return a[" + articalIndex + "].innerText");  
        }
});
