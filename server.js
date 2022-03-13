var express = require('express');
var app = express();
app.set('view engine','pug');
var tasks = ['india','usa','russia','england']
app.get("/",(req,res)=>{
    res.render("index",{title:"praveen",age:38,techs:['node','mongo','angular','react','php','c++']
    ,contacts:[{
        email:'praveengclasses@gmail.com',
        phone:9561214818
    },
    {
        email:'karishma@datagrid.com',
        phone:12123123
    }]});
})
app.listen(3500,()=>{console.log("Server on 3500")})