let requestLanguage = require('express-request-language');
let cookieParser = require('cookie-parser');
let express = require('express');
let path = require('path');

let app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLanguage({
  languages: ['en', 'es'],
  cookie: {
    name: 'language',
    options: { maxAge: 24*3600*1000 },
    url: '/languages/{language}'
  }
}));

app.get('/', function(req, res) {
  console.log(req.language);
  if (req.language.indexOf('es') > -1) {
    res.redirect('/es/')
  } else {
    renderPage(res, 'EN')
  }
});

app.get('/en/', function (req, res) {
  renderPage(res, 'EN')
});

app.get('/es/', function (req, res) {
  renderPage(res, 'ES')
});

function renderPage(res, lang) {
  res.sendFile(path.join(__dirname+ '/public/pages/index' + lang + '.html'));
}

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});