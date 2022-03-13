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

//1. res.send()
//2. res.sendFile()
//3. res.json()
//handling get request

//1. req.params
//2. configure body-parser middleware(urlencoded,json)====>req.body
//handling post request as well as sending post request using fetch

//handling delete request at server side sending delete request using fetch
//handling PUT request at server side sending PUT request using fetch

//crud operations

//template engine pug
//understood
//configured
//rendering templates
//passing data to templates
//access input data in templates
//looping input data
//style to templates

//middlewares....
//authentication authorisation using middlewares
//multiple ways of usig middlewares
//multiple middlewares at a time
//route specific middlewares

//cookies
//configuration//usage of cookieparse
//usage of cookies parse in authentication

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

var validate = function(req,res,next){
    console.log("MIddle middle function called");
    if(req.cookies.username)
    {
        next();
    }
    else{
        res.redirect("/login")
    }
}
const requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    console.log(req.requestTime)
    next()
  }
// app.use(validate,requestTime);

app.use(validate);
app.use(requestTime);
const checkAuthorization = function(req,res,next){
    console.log("he is authorized")
    next();
}
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

app.put("/updateTask", checkAuthorization, (req,res)=>{
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