const {Builder, By, Key, until} = require('selenium-webdriver');

(async () => {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('localhost:3000/register')

    await driver.findElement(By.id('nameInputBox')).click()
    await driver.getTitle()

  } finally {

    await driver.quit()

  }
})();