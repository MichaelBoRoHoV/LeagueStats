
const express = require("express")

const app = express();

app.get("/",function(req, res){
    res.send("Hello World!")
});


app.listen(3000,function(){
    console.log("Server is up and running in port 3000")
});