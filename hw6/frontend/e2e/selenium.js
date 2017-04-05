const webdriver = require('selenium-webdriver')

const url = 'http://localhost:8080/index.html'

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

exports.driver = driver
exports.By = webdriver.By
exports.findId = id => driver.findElement(webdriver.By.id(id))
exports.findCSS = css => driver.findElement(webdriver.By.css(css))
exports.findClassName = name => driver.findElement(webdriver.By.className(name))
exports.findAllClassName = name => driver.findElements(webdriver.By.className(name))
exports.findAllCSS = css => driver.findElements(webdriver.By.css(css))
exports.findTags = tag => driver.findElements(webdriver.By.tagName(tag))
exports.go = _ => driver.navigate().to(url)
exports.sleep = millis => driver.sleep(millis)