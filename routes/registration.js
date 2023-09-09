var express = require('express');
const jsonfile = require('jsonfile');
var router = express.Router();
const dataBL = require('../models/dataBl')


router.get('/registration', function(req, res, next) {
  res.render('registration');
});

//==========================================
//checke if username already registration
router.post('/checkeData', async function(req, res, next) {
  let users = await dataBL.getUsers();
  let flag = false;
  let errorMessage = ""; // משתנה לאחסון הודעת השגיאה
  let color = ""; // משתנה לאחסון הצבע

  users.users.forEach(element => {
    if (element.Username == req.body.username) {
      flag = true;
      errorMessage = "This username already exists"; // תוכן ההודעה במשתנה
      color = '#FF0000'; // צבע אדום
    }
  });

  if (!flag) {
    await dataBL.saveUser(req.body);
    errorMessage = "Registration was successfully received"; // תוכן ההודעה במשתנה
    color = '0000FF'; // צבע כחול
  }

  res.render('data', { errorMessage: errorMessage, color: color });
});


module.exports = router;
