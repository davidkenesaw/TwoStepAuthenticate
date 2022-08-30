const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
})
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {LogUserIn,insertUser} = require('./db.functions')
const {sendEmail} = require('../Config/email.config')

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "public"));
app.use(cookieParser(process.env.SECRETE));//change this and make it secrete

app.set('views', __dirname+"/views");
//get Pages
app.get("/",function(req,res){
    res.render("LandingPage");
});
app.get("/LoginPage",  function(req,res){
    const error = "";
    res.render("Login",{error});
});
app.get("/RegisterPage",function(req,res){
    const error = "";
    res.render("Register",{error});
});
app.get('/CodePage',function(req,res){
    const randomNumber = Math.floor(Math.random() * 9999) + 1000
    res.cookie('RegisterSecrete',randomNumber,{signed:true});
    sendEmail(req.signedCookies.Email,randomNumber)
    
    const error = "";
    res.render('CodePage', { error });
});
app.get('/UserRegistered',function(req,res){
    res.render('Registered');
});
app.get("/Homepage",function(req,res){
    const user = req.cookies.UserName;
    res.render("homepage",{user});
});

//post
app.post("/Login",LogUserIn)
app.post('/CompleteLogin',function(req,res){
    
    const crackedCode = req.signedCookies.RegisterSecrete;
    const user = req.body.code;

    if(user == crackedCode){
        res.clearCookie("RegisterSecrete");
        res.clearCookie("Email");
        res.cookie("loginID", "865843765",{signed:true});
        res.redirect("/Homepage");
    }else{
        const error = "code incorrect"; 
        res.render("CodePage",{error})
    }
});
app.post("/Register",insertUser)
app.post("/SendAgain",(req,res)=>{
    const error = "code sent"; 
    res.redirect('/CodePage');
    
})

app.listen(process.env.PORT || 3456,function(){
    console.log("Port: 3456");
});