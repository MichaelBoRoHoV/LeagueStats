
const express = require("express")
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/leagueStatsDB", {useNewUrlParser: true,useUnifiedTopology: true});
console.log("sucssefully connected to db");

const playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jersey: Number
});

const Player = mongoose.model("Player", playerSchema);

app.get("/players",function(req, res){
    Player.find(function(err,queryResult){
        if(!err){
            res.send(queryResult);
        }  else {
            console.log(err);
        }
    });
});


app.listen(3000,function(){
    console.log("Server is up and running in port 3000")
});