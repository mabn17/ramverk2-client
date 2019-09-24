/**
 * Test for getting started with Selenium.
 */
"use strict";



const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

// Test suite
test.describe("Register", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        browser.get("http://localhost:4200/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }
    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    test.it("Should be register URL", function(done) {
        goToNavLink("Logga in");
        browser.findElement(By.id('register')).click();
        this.timeout(10000);
        matchUrl('register');
        done();
    });

    test.it("Button should be disabled with no values", function(done) {
        goToNavLink("Logga in");
        browser.findElement(By.id('register')).click();
        this.timeout(10000);

        var btn = browser.findElement(By.id('go'));
        btn.getAttribute('disabled')
        .then(function(disabled) {
            assert.equal(disabled, 'true');
        });

        done();
    });
});