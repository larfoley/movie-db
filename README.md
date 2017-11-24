
## Requirements
 - Node.js

## Getting Started

### Clone
To download the latest codebase run the command `git clone https://github.com/larfoley/movie-db.git`

**Note:**  If you have already cloned the website use the command `git pull origin master` to update your local codebase with the master branch.

### Install Dependencies
Next you will need to install all of the project dependencies with the command `npm install` . This will read from the package.json file and install all of the dependencies in a folder called node_modules.

### Running the App Locally
To run the app, type the command `npm run start` . Now open a web browser and type in the following url http://localhost:3000  to view the app.

## Creating Views
To create views, we will be using the [ejs templating engine](http://ejs.co/) . ejs allows you to create dynamic server side html templates. These templates allow javascript to run along side you html.

All of our temlate files will be inside the `/views` directory. Inside this folder there is two sub folders called `/views/pages` and `/views/partials`, the pages folder is for templates that make up an entire webpage. The partials folder is for templates that can be included inside other templates. 

### Outputing Javascript Expresions

```html
<!-- quick-maths.ejs -->

<p> Quick Maths:  <%= (2 + 2) -1 %> </p>
 ```
When this template gets compiled to html it look like this.
```html

<!-- quick-maths.html -->
 <p> Quick Maths:  3 </p>
 
```
Noctice the openeing ejs tag `<%=` above has an equals sign at the end, this tells ejs to ouptut the following expression. If you ommit the equals sign, ejs will just run the javascript without ouputing anything to the compiled html file.

### Accessing Variables Inside a Template


```html
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```
Note that the above code first checks to see if there is a variable called `user`. If you try output a variable that ejs cannot access it will throw an error.

### Including Tempaltes
To include a template ejs provides a `include` function. The funciton takes two paramaters, the first is the path to the template and the second is an object which contains all of the data that the template can use.

```html
<!-- user.ejs -->

 <div>
  <h3> Name: <%= username %> </h3>
 </div>
 
```html

<!-- hello-world.ejs -->

<header>
 <h1>Hello World</h1>
</header>

 <%- include('/views/paritals/user', {usernmae: "Bob"}) %>

```
When the above hello world file gets compiled it will look like this:

```html
<!-- hello-world.html -->
<header>
 <h1>Hello World</h1>
</header>

 <div>
  <h3> Name: Bob </h3>
 </div>
```

## Creating Routes
First create you wil have to create your route file inside the `/routes/` directory.

Name the file after the route, so for example, if you created a file called `/routes/example.js` you would then run following code:

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
// Add your route here 
app.use('/example', example)

```

