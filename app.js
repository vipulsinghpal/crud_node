const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dog = require('./dog.model');



mongoose.connect('mongodb://localhost:27017/Dogdb');

const port = 8080;

app.get('/',(req,res)=>{
    console.log("empty route");
    res.send("welcome to my app");
})


app.get('/dog',(req,res) =>{
    console.log('get all dogs')
    dog.find({}).exec((err,dogdata) =>{
        if(err){
            res.send('error')
        }
        else{
            console.log("getting all data here" +dogdata);
            res.json(dogdata)
        }
    })
})
app.get('/dog/:id',(req,res) =>{
    console.log("get one dog detail");
    dog.findOne({
        _id:req.params.id
    }).exec((err,singledogdata) =>{
        if(err){
            res.send("Error while getting")
        }
        else{
            console.log("getting single dog data");
            res.json(singledogdata);
        }
    })
})

app.listen(port, ()=>{
    console.log("server started on port" +port);
});