var express = require("express");
var body_parser = require("body-parser");
var _ = require("underscore"); 

var app = express();
var PORT = process.env.PORT || 3000;

var db = [{id:1,name:"Udhay",msg:"Success"},{id:2,name:"sabarish",msg:"hi"}];

app.use(body_parser.json());

app.get("/", function(req,res){
   
    res.setHeader('content-type', 'application/json');
    
    res.send(JSON.stringify(db));
    
});

app.get("/:id", function(req,res){
   
    res.setHeader('content-type', 'application/json');
    
    var dat = _.findWhere(db,{id:parseInt(req.params.id)});
  
    if(dat)
    
    res.send(JSON.stringify(dat));
   
    else{
    
        res.status(404).send(JSON.stringify("Nothing Found!"));
        
    }
  
});

app.post("/datum",function(req,res){
    
    var body=_.pick(req.body,'id','name','message');
    
    if(!_.isString(body.name.trim()) || !_.isNumber(body.id) || body.message.trim().length === 0){
        
        return res.status(400).send(JSON.stringify("Invalid Data"));
        
    }
    
    body.name=body.name.trim();
    
    body.message=body.message.trim();
      
    db.push(body);
    
    res.json(body);
        
});

app.listen(PORT,function(){
    
    console.log("server Started on port : "+PORT);
    
});