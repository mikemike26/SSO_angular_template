# Single Sign On Angular Template

This is a base app that handles authentication, route protection , and errors invloved with an sso token.  Sets angular app session and provides settings to disable authentication behavior in development.

Check out the config and setting files first, then the auth service.


This app also roles in basic automation for compiling your assets into a production or dev build.  Also includes a watch command that will add script tags to the index when you create a new js file.  In production, this compiles into one main.js and inserts into the page.  Check out the gruntfile for more info

##Use
After pulling down the code, run npm install to install all dependencies.  Make sure to refer to the gruntfile for task commands for watching asset changes and production and development builds.

##How it Works
If auth is enabled in the settings, the app will first call your web service to confirm session/login, if not logged in, it will then check for an SSO token in the url, strip it out, and send to the server for processing.

If no session or token exists, redirect to login platform with an appId, origin url (easiest to be able to redirect with the url hash as well), and any other parameters specified in the config.
