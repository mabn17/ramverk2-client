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
test.describe("Login", function() {
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


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    test.it("Should be login URL", function(done) {
        goToNavLink("Logga in");
        matchUrl('login');

        done();
    });

    test.it("Button should be disabled with no values", function(done) {
        goToNavLink("Logga in");

        var btn = browser.findElement(By.id('go'));
        btn.getAttribute('disabled')
        .then(function(disabled) {
            assert.equal(disabled, 'true');
        });

        done();
    });
});