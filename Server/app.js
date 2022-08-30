//require statements
const path = require('path')
require('dotenv').config({ 
    path: path.resolve(__dirname, '../.env') 
})
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const {LogUserIn,insertUser} = require('./db.functions')
const {sendEmail} = require('../Config/email.config')

//configre express app
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "public"));
app.use(cookieParser(process.env.SECRETE));//change this and make it secrete
app.set('views', __dirname+"/views");

//get Pages
app.get("/",function(req,res){//landing page
    res.render("LandingPage");
});
app.get("/LoginPage",  function(req,res){//login page
    const error = "";
    res.render("Login",{error});
});
app.get("/RegisterPage",function(req,res){//register page
    const error = "";
    res.render("Register",{error});
});
app.get('/CodePage',function(req,res){//enter in a code page
    const randomNumber = Math.floor(Math.random() * 9999) + 1000
    res.cookie('RegisterSecrete',randomNumber,{signed:true});
    sendEmail(req.signedCookies.Email,randomNumber)
    
    const error = "";
    res.render('CodePage', { error });
});
app.get('/UserRegistered',function(req,res){//page displaying user is registered
    res.render('Registered');
});
app.get("/Homepage",function(req,res){//homepage
    const user = req.cookies.UserName;
    res.render("homepage",{user});
});

//http post requests
app.post("/Login",LogUserIn)//login functionality
app.post('/CompleteLogin',function(req,res){//check to see if code is correct
    
    const crackedCode = req.signedCookies.RegisterSecrete;
    const user = req.body.code;

    if(user == crackedCode){//code correct redirect to homepage
        res.clearCookie("RegisterSecrete");
        res.clearCookie("Email");
        res.cookie("loginID", "865843765",{signed:true});
        res.redirect("/Homepage");
    }else{//nod correct
        const error = "code incorrect"; 
        res.render("CodePage",{error})
    }
});
app.post("/Register",insertUser)//register functionality
app.post("/SendAgain",(req,res)=>{//send code again
    const error = "code sent"; 
    res.redirect('/CodePage');
    
})

app.listen(process.env.PORT || 3456,function(){//host site
    console.log("Port: 3456");
});