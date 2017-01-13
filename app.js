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
    queryName: 'locale',
    options: { maxAge: 24*3600*1000 },
    url: '/languages/{language}'
  }
}));

app.get('/', function(req, res) {
  console.log(req.language); // 'en'
  if (req.language.indexOf('es')) {
    res.sendFile(path.join(__dirname+ '/public/pages/indexEN.html'));
  } else {
    res.sendFile(path.join(__dirname+ '/public/pages/indexES.html'));
  }
});

// set a cookie to request locale
app.get('setlocale/:locale', function (req, res) {
  res.cookie('language', req.params.locale);
  res.redirect('back');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!')
});