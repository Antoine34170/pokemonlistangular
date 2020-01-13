//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-reroll-test'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/angular-reroll-test/index.html'));
});

app.post('/', function(request, response){
    console.log(request.body);      // your JSON
     response.send(request.body);    // echo the result back
  });

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
