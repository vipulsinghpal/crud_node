import express from 'express';
const router = express.Router()
// const dog = require('../dog.model');
import dogModel from '../dog.model.js';
// const {middlewareF} = require('../utilities/middleware')
import { middlewareF } from '../utilities/middleware.js';
// const Joi = require('joi');
// import Joi from 'express-joi-validation'
// const validator = require('express-joi-validation').createValidator({})


router.get('/',(req,res)=>{
    console.log("empty route");
    res.send("welcome to my app");
})


router.get('/dog',middlewareF,(req,res) =>{
    console.log('get all dogs')
    try{
    dogModel.find({}).exec((err,dogdata) =>{
        if(err){
            return res.json('error')
        }
        else{
            console.log("getting all data here" +dogdata);
           return res.json(dogdata)
        }
    })
} catch(error){
    return res.json('error')
    console.log(error.message)
}
}) 
// get single data with d
router.get('/dog/:id',(req,res) =>{
    console.log("get one dog detail");
    dogModel.findOne({
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
router.post('/dog',(req,res)=>{
    console.log("inside post request");
    dogModel.create(req.body, (err,Updateddata)=>{
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
router.put('/dog/:id',(req,res)=>{
    console.log("inside put");
    dogModel.findOneAndUpdate({
        _id:req.params.id
    },{$set: {Breedname: req.body.Breedname}},
    {new:true},
    (err,updatedBreedname)=>{
        if(err){
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
router.delete('/dog/:id',(req,res) =>{
    dogModel.findOneAndRemove({
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

export default router;