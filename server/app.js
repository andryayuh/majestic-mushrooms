'use strict';
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const axios = require('axios');
const app = express();

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(middleware.auth.session);
app.use(middleware.auth.initializeAuthentication);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);
app.use('/authenticated', routes.auth);
// app.use('/api', routes.api);
app.use('/api/messages', routes.messages);
app.use('/api/profiles', routes.profiles);
app.use('/api/folders', routes.folders);
app.use('/api/search', routes.search);
app.use('/api/threads', routes.threads);
app.use('/api/account', routes.account);
app.use('/api/contacts', routes.contacts);

module.exports = app;
