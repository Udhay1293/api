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
    
        res.status(404).send(JSON.stringify("Not Found!"));
        
    }
  
});

app.get("/db/search", function(req,res){
   
    res.setHeader('content-type', 'application/json');
    
    var queryParams = req.query;
   
    var dat=db;
    
    if(queryParams.hasOwnProperty('id')){
            
    dat = _.findWhere(db,{id:parseInt(queryParams.id)});
          
    }
    
    if(dat)
    
    res.send(JSON.stringify(dat));
   
    res.status(404).send(JSON.stringify("Not Found!"));
    
});

app.post("/datum",function(req,res){
    
    var body=_.pick(req.body,'id','name','message');
    
    res.setHeader('content-type', 'application/json');
    
    if(!_.isString(body.name.trim()) || !_.isNumber(body.id) || body.message.trim().length === 0){
        
        return res.status(400).send(JSON.stringify("Invalid Data"));
        
    }
    
    body.name=body.name.trim();
    
    body.message=body.message.trim();
      
    db.push(body);
    
    res.json(body);
        
});

app.delete("/:id",function(req,res){
    
    res.setHeader('content-type', 'application/json');
    
    var dat = _.findWhere(db,{id:parseInt(req.params.id)});
    
    if(!dat){
        
       return res.status(404).send(JSON.stringify("Not Found!"));
        
    }
    
    db = _.without(db,dat);
    
    res.json(db);
    
});

app.put('/:id',function(req,res){
    
    var body=_.pick(req.body,'id','name');
              
    var validAttributes={};
    
    if(body.hasOwnProperty('name') && _.isString(body.name)){
        
        var dat = _.findWhere(db,{id:parseInt(req.params.id)});
        
        if(dat){
            
            validAttributes.name=body.name;
            
            _.extend(dat,validAttributes );
            
            res.status(200).json(db);
            
        }
        
        else{
            
            res.status(404).json("Not Found");
        }
   
    }
    
    else{
        
       res.status(198).json("Invalid Data");
        
    }
debugger;
});

app.listen(PORT,function(){
    
    console.log("server Started on port : "+PORT);
    
});