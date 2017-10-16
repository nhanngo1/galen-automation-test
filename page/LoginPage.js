
this.LoginPage  = $page("Login page", {
        loginForm: "#ncenvoy-modal .ncenvoy-identity.ncenvoy-identity-login"
    },{
        loginAsTestUser: loggedFunction("Login as user ${_1.username} and password ${_1.password}", function(user){
            var driver = session.get("driver");
            var tmp = driver.findElement(By.cssSelector('#ncenvoy-modal .ncenvoy-identity.ncenvoy-identity-login'));
            driver.switchTo().frame(tmp);

            inject(driver, "document.getElementById('cam_password').setAttribute('value', '" + user.password +"')");
            inject(driver, "document.getElementById('cam_username').setAttribute('value', '" + user.username +"')");
            inject(driver, "document.getElementsByClassName('button-submit')[0].click()");    
        })
});