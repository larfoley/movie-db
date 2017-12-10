var ejs = require("./vendor/ejs.js");

module.exports = (function() {

  var path = "http://localhost:300/templates/"

  return {

    setTemplatesLocation: function(path) {
      path = path;
    },

    render: function(template, data, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", path + template + ".ejs", true);
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            callback(ejs.render(this.responseText, data))
          }
        }
      }
      xhr.send();
    }

  }

}())
