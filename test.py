from selenium import webdriver

driver = webdriver.Safari(desired_capabilities={'browserName': 'Safari Technology Preview', 'platformName': 'mac'}, executable_path='/Applications/Safari Technology Preview.app/Contents/MacOS/safaridriver')
driver.get("https://example.com")

resp = driver.execute_async_script('''
    let done = arguments[arguments.length - 1];
    browser.runtime.sendMessage("com.oskarpersson.storagebug.Extension (H528K2VA5W)", { greeting: "hello" }).then((response) => {
        done(response);
    });
''')

print(resp)
