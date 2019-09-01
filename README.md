# Angular Website
A frontend for [Ramverk2 *v2*](https://dbwebb.se/kurser/ramverk2-v2)

# Badges
[![Build Status](https://travis-ci.org/mabn17/ramverk2-client.svg?branch=master)](https://travis-ci.org/mabn17/ramverk2-client)

[![Build Status](https://scrutinizer-ci.com/g/mabn17/ramverk2-client/badges/build.png?b=master)](https://scrutinizer-ci.com/g/mabn17/ramverk2-client/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mabn17/ramverk2-client/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mabn17/ramverk2-client/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/mabn17/ramverk2-client/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/mabn17/ramverk2-client/?branch=master)

## Requirements
[Server](https://github.com/mabn17/ramverk2-server) - Click for more informtaion on how to install and set up.

## Installation
1. Clone the repo `git clone git@github.com:mabn17/ramverk2-client.git`.
2. Install the dependencies `npm install`
3. Start the app `npm start`

## Testing
1. To see reports from the unittests `npm test`
2. Tests with Selenium `npm run test:ci`

## Routes
***/*** - Home.  
***/add/redovisa/:kmom*** - Eddit given report (requires authenticated user to send), redirects to /add/redovisa if there is no matching title.  
***/add/redovisa*** - Add report (requires authenticated user to send).  
***/chat*** - Chat using sockets.  
***/redovisa/:kmom*** - To see a spesific report.  
***/om*** - The about page.  
***/login*** - The login page.  
***/register*** - The registration page.  
***/\*\**** - Catching unknown routes with an error message.  
