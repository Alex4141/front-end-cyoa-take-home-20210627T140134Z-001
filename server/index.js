const express = require('express');
const bodyParser = require('body-parser');

const DataAccessObject = require('./dataAccessObject');
const Comment = require('./comment');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataAccessObject = new DataAccessObject('./database.sqlite3');
const comment = new Comment(dataAccessObject);

let clientList = [];

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    
    const { id } = result;
    comment.getComment(id).then(result => {
      clientList.forEach((clientObject) => {
        clientObject.res.write(`data: ${JSON.stringify(result)}\n\n`);  
      });
    });

    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

app.get("/stream", (req, res) => {
  res.set("Content-Type", "text/event-stream");
  res.set("Cache-Control", "no-cache");
  res.set("Connection", "keep-alive");
  res.set("Access-Control-Allow-Origin", "*");

  const identifier = Date.now();
  const clientObject = { 
    identifier,
    res 
  };

  clientList.push(clientObject);

  req.on('close', () => {
    clientList = clientList.filter((item) => identifier !== item.identifier);
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  const rootDir = __dirname.replace('/server', '');
  response.sendFile(`${rootDir}/src/index.html`);
});
