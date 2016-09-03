/**
 * Created by krisztian on 01/09/16.
 */

var express = require('express');
var app = express();


//    app.set('port', process.env.PORT || config.port);
//   app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
//    app.use(express.bodyParser());
//    app.use(express.static(path.join(__dirname, 'site')));

app.use(express.static('public'));
app.listen(8080); //the port you want to use