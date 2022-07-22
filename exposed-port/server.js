const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const { api } = require('./api');

const app = express();
app.use(cors())
app.use(express.json());

const dbname = "testdatabase";
const collection = "requests";
const API = new api('mongodb://localhost:27017/'); 

//POST endpoints 
app.post('/new', (req, res) => {
  console.log("new request created!")
  API.insert(dbname, collection, req.body)
  console.log(req.body.id)
  console.log(req.body.quote)
  console.log(req.body.source)
  console.log(req.body.author)
  console.log(req.body.year)
  console.log(req.body.updateList)
  console.log(req.body.urgency)
  res.sendStatus(200);
});
app.post('/status', (req, res) => {
  console.log("status changed manually")
  console.log(req.body)
  res.sendStatus(200);
});
app.post('/close', (req, res) => {
  API.change_status(
    dbname, 
    collection, 
    req.body.id, 
    req.body.urgency
  );
  res.sendStatus(200);
});
app.post('/update', (req, res) => {
  let result = API.update(
    dbname, 
    collection,
    req.body.id, 
    req.body.updateList, 
    req.body.urgency)
  console.log(req.body.updateList)
  res.sendStatus(200);
});

//GET endpoints
app.get('/', (req, res) => {
  console.log("get endpoint hit");
  res.sendStatus(200);
});
app.get('/active', (req, res) => {
  const sendData = (state, response=res) => {
      console.log(state);
      response.send(state);
    };
  API.active_requests(dbname, collection, sendData);
  });
app.get('/inactive', (req, res) => {
  const sendData = (state, response=res) => {
      console.log(state);
      response.send(state);
    };
  arrayOfJson = API.inactive_requests(dbname, collection, sendData);
});

const port = 5000;
app.listen(`${port}`, () => {
  console.log("listening on port ", port);
});



