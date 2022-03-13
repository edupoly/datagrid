var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser());

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})
app.post("/authenticate",(req,res)=>{
    console.log("req.body::",req.body)
    if(req.body.username==='praveen' && req.body.password==='abc'){
        res.cookie('username',req.body.username)
        res.redirect("/")
    }
    else{
        res.sendFile(__dirname+"/errorlogin.html")
    }
})

app.use(function(req,res,next){
    console.log("MIddle middle function called");
    if(req.cookies.username)
    {
        next();
    }
    else{
        res.redirect("/login")
    }
})

var tasks = ['manas shoe','milkshakes','carwash'];


app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html")
})
app.get("/getTasks",(req,res)=>{
    res.json(tasks)
})
app.post("/addTask",(req,res)=>{
    console.log("req.body",req.body)
    tasks.push(req.body.task)
    res.json({message:'SUCCESS'})
})
app.put("/updateTask",(req,res)=>{
    console.log("req.body",req.body)
    tasks[req.body.id]=req.body.task;
    res.json({message:'SUCCESS'})
})
app.delete("/deleteTask/:id",(req,res)=>{
    console.log(req.params)
    tasks.splice(req.params.id,1);
    res.send({"message":"SUCCESS"})
})
app.listen(3400,function(){console.log("Server running on 3400")})