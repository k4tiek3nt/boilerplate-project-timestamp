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
  var userDate = req.params.date;
  console.log("Entered Date " + userDate);
  //Checking User Input is in Expected Format
  let checkDateFormat = moment(userDate, 'YYYY-MM-DD', true).isValid();
  console.log("Date moment " + checkDateFormat);
  //Checking Usere Input is a Date String or Unix TimeStamp. Unix TimeStamp fails this.
  let dateToString = new Date(userDate).toString();
  console.log("date to string " + dateToString);

  //Process to follow if userDate is YYYY-MM-DD
  if (checkDateFormat){
    //Convert userDate to new Date Object
    let newDate = new Date(userDate);
    
    //Convert new Date to UTC String
    let timeStampInMs = newDate.toUTCString();
    console.log("TimeStamp is defined " + timeStampInMs);
    
    //Get Unix Timestamp from the value of the new Date
    let unixTimeStamp = Date.parse(userDate); //changed from newDate.valueOf();

    //Return expected data in JSON Format
    res.json({ unix: unixTimeStamp, utc: timeStampInMs });
  } 

  //Process to follow if userDate was a date string and not YYYY-MM-DD or Unix Timestamp
  if (!checkDateFormat && dateToString !== 'Invalid Date') {
    //Formats a Date String to ISO Date without time (YYYY-MM-DD)
    let dateStringFormatted = new Date(dateToString).toISOString().substring(0,10);
    console.log("Date String Formatted " + dateStringFormatted); 
    
    //Convert dateStringFormatted to new Date Object
    let newDate = new Date(dateStringFormatted);
    
    //Convert new Date to UTC String
    let timeStampInMs = newDate.toUTCString();
    console.log("TimeStamp is defined " + timeStampInMs);
    
    //Get Unix Timestamp from the value of the new Date
    let unixTimeStamp = Date.parse(newDate);

    //Return expected data in JSON Format
    res.json({ unix: unixTimeStamp, utc: timeStampInMs });     
  }
  
  //Process to follow if Date is not YYYY-MM-DD, is not null, and dateToString is invalid
  //Which all should mean the date is potentially a unix date format
  if (!checkDateFormat && userDate != null && dateToString == 'Invalid Date'){
    
    //Confirm the date about to be used is a date when treated as a number, otherwise it's not a unix date
    let checkValidDate = new Date(parseInt(userDate));
    console.log("Check if valid date " + checkValidDate);

    //Confirms date was not invalid, assumes is a Unix Timestamp at this point
    if (checkValidDate != "Invalid Date"){
      //Formats a Unix Timestamp to ISO Date without time (YYYY-MM-DD)
    let unixDateFormatted = new Date(parseInt(userDate)).toISOString().substring(0,10);
    console.log("Unix Date Formatted " + unixDateFormatted); 
    
    //Convert unixDateFormatted to new Date Object
    let newDate = new Date(unixDateFormatted);
    
    //Convert new Date to UTC String
    let timeStampInMs = newDate.toUTCString();
    console.log("TimeStamp is defined " + timeStampInMs);
    
    //Get Unix Timestamp from the value of the new Date
    let unixTimeStamp = Date.parse(newDate);

    //Return expected data in JSON Format
    res.json({ unix: unixTimeStamp, utc: timeStampInMs }); 
    } else{ //If date was invalid, it isn't a Unix Date and must be an invalid date
      res.json({
        error : "Invalid Date"
       }); 
    }
    
  }
  
  //Process to follow if userDate is null
  if (userDate == null) {
    
  //Get new Date Object, because userDate is null
  let newDate = new Date();
  
  //Convert new Date to UTC String
  let timeStampInMs = newDate.toUTCString();
  console.log("TimeStamp is defined " + timeStampInMs);
  
  //Get Unix Timestamp from the value of the new Date
  let unixTimeStamp = newDate.valueOf();

  //Return expected data in JSON Format
  res.json({ unix: unixTimeStamp, utc: timeStampInMs });
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});