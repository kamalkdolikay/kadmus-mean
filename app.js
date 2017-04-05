import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
// import favicon from 'serve-favicon';
import path from 'path';
import { middleware as stylusMiddleware } from 'stylus';
import index from './routes/index';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test');

const app = express();
const debug = Debug('cadmus:app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());
app.use(stylusMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
/* eslint no-unused-vars: 0 */
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
    debug('Caught exception: %j', err);
    process.exit(1);
});

export default app;