const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');


app.use(express.static('dist'));

// create a GET route
// app.get('/express_backend', (req, res) => { //Line 9
//   return res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
//   console.log(path.resolve(__dirname, '../index.html'));
//   return res.status(200).sendFile(path.resolve(__dirname, '../src'));
// }); 

app.get('/', (req, res) => {
  console.log('hi');
  return res.status(200).res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
