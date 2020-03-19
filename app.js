
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/leagueStatsDB", {useNewUrlParser: true,useUnifiedTopology: true});
console.log("sucssefully connected to db");

const playerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    jersey: Number
});

const Player = mongoose.model("Player", playerSchema);


app.route("/players")

.get(function(req, res){
    Player.find(function(err,queryResult){
        if(!err){
            res.send(queryResult);
        } else {
            console.log(err);
        }
    });
})
.post(function(req,res){

    const newPlayer = new Player({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jersey: req.body.jersey
    });
    newPlayer.save();
    res.send("Player Was added to DB");
});

app.route("/players/:playerID")

.get(function(req,res){
    
    Player.findOne({_id:req.params.playerID},function(err,queryResult){
        if(queryResult){
            res.send(queryResult);
        }else{
            res.send("No Matching results were found")   
        }
    });
})
.delete(function(req, res){
    Player.deleteOne({_id:req.params.playerID},function(err){
        if(!err){
            res.send("Successfully deleted the selected player");
        }else{
            res.send(err);
        }
    }) 
});



app.listen(3000,function(){
    console.log("Server is up and running in port 3000")
});