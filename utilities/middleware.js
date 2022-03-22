// module.exports = function(req,res,next){
    export const  middlewareF = (req,res,next)=>{
     console.log("inside middleware");
        if(req.headers && req.headers.name && req.headers.name == 'GSD'){
            console.log("got the details")
            next()
        }
        else{
            res.send("not autherised")
        }
    
    }

