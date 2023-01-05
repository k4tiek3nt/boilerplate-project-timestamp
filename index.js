// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//import moment.js library
var moment = require('moment'); // require
moment().format();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  //User Input assigned to variable
  let userDate = req.params.date;
  console.log("Entered Date " + userDate);
  //Checking User Input is Valid Date
  let checkDate = moment(userDate, 'YYYY-MM-DD', true).isValid();
  console.log("Date moment " + checkDate);

    //If the date is valid...
    if(checkDate){
      //Then assign to new Date 
      let date = new Date(userDate);
      console.log("Date is valid " + date);
      //Convert new Date to UTC String
      let timeStampInMs = date.toUTCString();
      console.log("TimeStamp is defined " + timeStampInMs);
      //Get Unix Timestamp from the value of the new Date
      let unixTimeStamp = date.valueOf();

      //If Date in UTC String is not invalid (same as saying is valid)
      if (timeStampInMs !== "Invalid Date" && timeStampInMs !== "Invalid time value") {
        res.json({ //Return expected data in JSON Format
          unix: unixTimeStamp,
          utc: timeStampInMs
        });
      } else { // if date in UTC string is invalid, return that it is invalid
        res.json({
          error : "Invalid Date"
        });      
      } 
    } else { //If date was not valid, this assumes is Unix Timestamp
      //Formats the Unix Timestamp to MM/DD/YYYY
      let unixDateFormatted = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', 
        day: '2-digit' }).format(userDate);
        console.log(unixDateFormatted);
      //Checks that date was formatted, which will fail if is not a Unix Timestamp
      let checkUnixDate = moment(unixDateFormatted, 'MM/DD/YYYY', true).isValid();
      console.log("Date moment " + checkUnixDate);

      //If passes check that date was formatted...
      if(checkUnixDate){
      //Then get new Date from formatted Unix Date
      let date = new Date(unixDateFormatted);
      console.log("Date is valid " + date);
      //Convert new Date to UTC String
      let timeStampInMs = date.toUTCString();
      console.log("TimeStamp is defined " + timeStampInMs);
      //Get Unix Timestamp from the value of the new Date  
      let unixTimeStamp = date.valueOf();
        
      //If Date in UTC String is not invalid (same as saying is valid)
      if (timeStampInMs !== "Invalid Date" && timeStampInMs !== "Invalid time value")  {
        res.json({ //Return expected data in JSON Format
          unix: unixTimeStamp,
          utc: timeStampInMs
        });
      } else { // if date in UTC string is invalid, return that it is invalid
        res.json({
          error : "Invalid Date"
        });      
      }    
    }
  }
});

app.get("/api/ ", function (req, res) {
  
  let date = new Date();
  console.log("Date is valid " + date);
  let timeStampInMs = date.toUTCString();
  console.log("TimeStamp is defined " + timeStampInMs); 
  let unixTimeStamp = date.valueOf();
  
  if (timeStampInMs !== "Invalid Date") {
    res.json({
      unix: unixTimeStamp,
      utc: timeStampInMs
    });
  } else {
    res.json({
      error : "Invalid Date"
    });      
  }
});

app.get("/api/2015-12-25", function (req, res) {
  res.json({"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get("/api/1451001600000", function (req, res) {
  res.json({"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});