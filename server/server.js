const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');


//Connect to mongoose / mongodb
const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://jakejurado:ihaveapassword@codesmith.dzpwbsj.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

//controller
const controller = require('./controller');

//parse
app.use(express.json());

//static
app.use(express.static('dist'));

//cors
const cors = require('cors');
app.use(cors());

//post request to /save
app.post('/save', controller.saveCeremonyScript, (req, res) => {
  console.log('fileSaved');
  return res.status(200).json(res.locals.mySave);
})

//get request to /save
app.get('/save', controller.getCeremonyScripts, (req, res) => {
  console.log('from the server', res.locals.myScripts);
  return res.status(200).json(res.locals.myScripts);
})

app.get('/', (req, res) => {
  console.log('hi');
  return res.status(200).res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});



// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
