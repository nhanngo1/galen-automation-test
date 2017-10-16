### Dailytelegraph Automation test

Automation test for Dailytelegraph website using [GalenFramework](http://galenframework.com).

### Setup

 - Download [chromedriver](http://chromedriver.storage.googleapis.com/index.html), extract downloaded package then add the folder to your path like this: export PATH=$PATH:~/path/to/directory/containing/chromedriver
 - Install [Galen](http://galenframework.com/docs/getting-started-install-galen/).
 
### Run test

 - Open terminal, navigate to galen-automation-test folder and execute command:
 	galen test test/test-file.js --htmlreport report-folder-name
 	e.g. galen test test/func.blog.test.js --htmlreport report

 	Please refer to [Running Galen](http://galenframework.com/docs/reference-working-in-command-line/) for more details.
