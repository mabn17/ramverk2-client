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

        browser.get("http://localhost:4200/register");
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

    test.it("Should be register URL", function(done) {
        matchUrl('register');
        done();
    });

    test.it("Button should be disabled with no values", function(done) {
        var btn = browser.findElement(By.id('go'));
        btn.getAttribute('disabled')
        .then(function(disabled) {
            assert.equal(disabled, 'true');
        });

        done();
    });
});