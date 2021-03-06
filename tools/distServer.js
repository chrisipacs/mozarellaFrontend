var express =require('express');
var path = require('path');
var open = require('open');
var compression = require('compression');

/*eslint-disable no-console */

const port = process.env.PORT || 3000;
const app = express();

process.env.NODE_ENV = 'production';

app.use(compression());
app.use(express.static('dist'));

app.use(function(req, res, next) {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
