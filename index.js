const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const http = require('http');

/* Modify theese blocks to add new twibbon to the app */
twibbonData = {
  twibbon: [
    {
      name: 'Test Twibbon',
      image: 'testtwibbon'
    },
    {
      name: 'Ordinary twibbon',
      image: 'ordinarytwibbon'
    }
  ]
}

app.set('views', path.join(__dirname, 'src'));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use('/assets', express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

setInterval(() => {
  http.get(`https://twibbon-um.reng.my.id/`);
}, 250000);

app.get('/', (req, res) => {
  console.log(Date.now() + ' Ping Received');
  res.status(200).render('index', twibbonData);
});

app.listen(3000, console.log('Listening on port 3000!'));
