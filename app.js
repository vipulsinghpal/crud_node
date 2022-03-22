// const express = require('express');
// const bodyparser = require('body-parser');
// const mongoose = require('mongoose');

import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// const router = require('./routes/dogRoute');
 import Router from './routes/dogRoute.js';

mongoose.connect('mongodb://localhost:27017/Dogdb');

const port = 8080;
//bodyparser to parse json
app.use(bodyParser.json())
//This bodyparser give or receive body elements through the url 
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(Router);

app.listen(port, ()=>{
    console.log("server started on port" +port);
});