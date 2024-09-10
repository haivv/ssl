var https = require('https');
var fs = require('fs');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var enRouter = require('./routes/en');
var jaRouter = require('./routes/ja');
var session = require('express-session');

var bodyParser = require("body-parser");
var multer = require('multer');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
  secret : 'key',
  resave : true,
  saveUninitialized : true
}));



// SET STORAGE Editor
const storageEditor = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './public/uploadEditor');
  },
  filename: function (req, file, callback) {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month + '-' + day;
      var fileName = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');
      callback(null, fileName);
  }
});
const uploadEditor = multer({ storage: storageEditor });
app.use('/public', express.static(path.join(__dirname, 'public')));
// Route  upload image
app.post('/upload2', uploadEditor.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(500).send('Please upload a file');
  }
  res.json({ imageUrl: `/public/uploadEditor/${req.file.filename}` });
});
// End 

// SET STORAGE Slide show
const storageSlideshow = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './public/uploadSlideshow');
  },
  filename: function (req, file, callback) {
      var today = new Date();
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
      var dateString = year + '-' + month + '-' + day;
      //
      var fileName = dateString + '_' + Buffer.from(file.originalname, 'latin1').toString('utf8');
      callback(null, fileName);
  }
});
const uploadSlideshow = multer({ storage: storageSlideshow });
app.post('/upload3', uploadSlideshow.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(500).send('Please upload a file');
  }
  res.json({ imageUrl: `/public/uploadSlideshow/${req.file.filename}` });
});

//end upload image for slide show




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/en', enRouter);
app.use('/ja', jaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// // HTTPS setup
// const options = {
//   key: fs.readFileSync('./keys/private.pem'),
//   cert: fs.readFileSync('./keys/certificate.pem')
// };

// https.createServer(options, app).listen(443, () => {
//   console.log('Server is running on https://localhost:443');
// });


module.exports = app;
