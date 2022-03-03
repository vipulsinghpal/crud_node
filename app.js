const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const dog = require('./dog.model');




mongoose.connect('mongodb://localhost:27017/Dogdb');

const port = 8080;
//bodyparser to parse json
app.use(bodyparser.json())
//This bodyparser give or receive body elements through the url 
app.use(bodyparser.urlencoded({
    extended:true
}));

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
// get single data with id
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

// post request to add record
app.post('/dog',(req,res)=>{
    console.log("inside post request");
    dog.create(req.body, (err,Updateddata)=>{
        if(err){
            res.send("error posting data")
        }
        else{
            res.send(Updateddata)
        }

    })
})

// update model using findone and update 
// MyModel.findOneAndUpdate({}, { $set: { test: 1 } }, { new: true }, callback);
app.put('/dog/:id',(req,res)=>{
    console.log("inside put");
    dog.findOneAndUpdate({
        _id:req.params.id
    },{$set: {Breedname: req.body.Breedname}},
    {new:true},
    (err,updatedBreedname)=>{
        if(err){emo
            res.send("error while updating")
        }
        else{
            console.log(updatedBreedname);
            res.send(updatedBreedname);
        }
    }
)

})
// for deletion using findOneAndRemove(conditions, options, callback)
app.delete('/dog/:id',(req,res) =>{
    dog.findOneAndRemove({
        _id:req.params.id
    },(err,deleterecord)=>{
        if(err){
            res.send("error while deleting");
        }
        else{
            res.send(deleterecord)
        }
    })
})

app.listen(port, ()=>{
    console.log("server started on port" +port);
});