var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
var db = [{id:1,name:"Udhay",msg:"Success"},{id:2,name:"sabarish",msg:"hi"}];

app.get("/", function(req,res){
   
    res.setHeader('content-type', 'application/json');
    
    res.send(JSON.stringify(db[0]));
    
});

app.listen(PORT,function(){
    
    console.log("server Started on port : "+PORT);
    
});