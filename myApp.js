let express = require('express');
let app = express();
let path = require('path'); 
let dotenv = require('dotenv').config(); 
const bodyParser = require('body-parser'); 



cssPath = path.join(__dirname, 'public'); 
app.use('/public', express.static(cssPath)); 

/*No argument for path included = executed for all paths
Doesn't terminate cycle so we call next() 
*/
app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip); 
  next(); 
})

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html'; 
  res.sendFile(absolutePath); 
  console.log('Hello Express'); 
})

app.get('/json', (req, res) => {
  messageJson = {"message":"Hello json"}; 
  if(process.env.MESSAGE_STYLE === "uppercase"){
    messageJson.message = "HELLO JSON"; 
  }
  res.json(messageJson); 
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString(); 
  console.log(req.time); 
  next(); 
}, (req, res) => {
  res.send({"time": req.time}); 
})

app.get('/:word/echo', (req, res) => {
  res.send({"echo": req.params.word}); 
})

app.get('/name', (req, res) => {
  console.log(req.query); 
  res.send({"name" : req.query.first + " " + req.query.last}); 
})

app.post('/name', (req, res) => {
  res.send({name: req.body.first + " " + req.body.last});
})






































 module.exports = app;
