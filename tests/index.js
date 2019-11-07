const {Builder, By, Key, until} = require('selenium-webdriver');

(async () => {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('https://fantasy-basketball-haig-turley.herokuapp.com')

    await driver.findElement(By.id('nameInputBox')).click()
    const title = await driver.getTitle()
	console.log(title)
  console.log("hello_world")
  } finally {

    driver.get('https://fantasy-basketball-haig-turley.herokuapp.com');
    driver.getEelement(By.xpath('/html/body/div/div/div/div/div')).click();
    deiver.findElement(By.className('sc-iwsKbI gYYcnc')).click();
    driver.findElement(By.name('name')).sendkeys('testing');

  }
})();

    // await driver.quit()
