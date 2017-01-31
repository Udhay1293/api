var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;

app.get("/", function(req,res){
   
    res.send(JSON.stringify({Name:"Udhay",Msg:"Success"}));
    
});

app.listen(PORT,function(){
    
    console.log("server Started on port : "+PORT);
    
});