const mongoose = require('mongoose');
const { flushSync } = require('react-dom');
const fs = require('fs');
const path = require('path');

const Saved_Ceremony = new mongoose.Schema({
  name: { type : String },
  entry: { type : Array }
})

const goatcheese = {"name": "my_saves", "entries": [[["vows", "01"], ["kiss", "01"]],[["opening_remarksOP", "14"], ["vows", "00"], ["kiss", "04"]]]};



const controller = {};

controller.saveCeremonyScript = (req, res, next) => {
    console.log('save ceremony script enter');
    console.log('here is the request body', req.body)
    console.log(typeof req.body);
    fs.writeFile(path.join(__dirname, '/files/ceremonyArr.txt'), JSON.stringify(req.body), err =>{
        if(err){
            console.error(err);
        } else {
            res.locals.mySave = JSON.stringify(req.body);
        }
        next();
    });
}


controller.getCeremonyScripts = (req, res, next) => {
  console.log('entered getCeremonyScripts')
  const allScripts = {ceremonies: [[["vows", "01"], ["kiss", "01"]],[["opening_remarksOP", "14"],["vows", "00"], ["kiss", "04"]]]}
  res.locals.myScripts = allScripts;
  next();
}








module.exports = controller;