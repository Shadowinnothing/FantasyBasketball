const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const expect = require('expect')
const uuid = require('uuid/v1')

//const { app } = require('./testServer')

let driver = null

describe('User Registration Tests', () => {

    before(async () => {
        driver = await new Builder()
            .withCapabilities(Capabilities.chrome())
            .build()
    })

    describe('Frontend', () => {
        it('Should register new user', async () => {
            
            await driver.get('localhost:3000/register')

            const input = await driver.findElement(By.id('nameInputBox'))
            await input.sendKeys(
                'Random Test User', Key.TAB,
                `${ uuid() }@test.com`, Key.TAB,
                'Random Test User', Key.TAB,
                'password', Key.TAB,
                'password', Key.TAB
            )

            const registerButton = await driver.findElement(By.id('registerButton'))
            registerButton.click()
        })
    })

    // close selenium and kill server when all tests have finished
    // TODO: FINISH THIS
    after(async () => {
        await driver.quit()
        // process.exit()
    })
})