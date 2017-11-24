
## Requirements
 - NodeJS

## Getting Started

### Clone
To download the latest codebase run the command `git clone https://github.com/larfoley/movie-db.git`

**Note:**  If you have already cloned the website use the command `git pull origin master` to update your local codebase with the master branch.

### Install Dependencies
Next you will need to install all of the project dependencies with the command `npm install` . This will read from the package.json file and install all of the dependencies in a folder called node_modules.

### Running the App Locally
To run the app, type the command `npm run start` . Now open a web browser and type in the following url http://localhost:3000  to view the app.

## Creating Views
To create views, we will be using the ejs template engine. ejs allows you to create dynamic server side html templates. These templates allow javascript to run along side you html.

### Outputing Javascript Expresions

```html
<!-- ejs template -->

<p> Quick Maths:  <%= (2 + 2) -1 %> </p>
 ```
 When this template gets compiled to html it look like this
```html

<!-- compiled html -->
 <p> Quick Maths:  3 </p>
 
```

## Creating Routes
First create you wil have to create your route file inside the `/routes/` directory.

Name the file after the route, so for example create a file called `/routes/example.js` and run the following code:

```javascript
// file name: /routes/example.js

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
 // Render the example view
 
 // The first paramater here is the path to the ejs template, the second paramter is an
 // optional object which contains data that the ejs template can access
 
 res.render('/pages/example', {title: "example"})
 
 // NOTE: this method will look for a file called /views/pages/example.ejs
 // If this file does not exists you will get an error
}
```

### Require the route
```javascript
// file name: app.js

var index = require('./routes/index');
var login = require('./routes/login');

// Require route here
var example = require('./routes/example.js');
```

### Use the Route
```javascript
// file name: app.js

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/search', search);
app.use('/tv-shows', tvShows);
app.use('/media', media);
// Add your route here
app.use('/example', example)

```

