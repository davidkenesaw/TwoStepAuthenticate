const dbConn = require('../Config/db.config');
const {sendEmail} = require('../Config/email.config')

function LogUserIn(req,res){//not done
    const user = req.body.Username;
    const Password = req.body.Password;//add use of password
    
    dbConn.query("SELECT * FROM Users WHERE UserName = ? AND Password = ?",[user,Password],function(err,rows){
        
        if(err){
            const error = "there was an issue with your username or password";
            res.render('Login',{error});//this is wrong
        }
        else{
            if(rows.length == 1){
                //const randomNumber = Math.floor(Math.random() * 9999) + 1000
                //res.cookie('RegisterSecrete',randomNumber,{signed:true});
                //sendEmail(rows[0].Email,randomNumber)
                res.cookie('Email',rows[0].Email,{signed:true});
                console.log(rows[0].Email)
                res.cookie('UserName',rows[0].UserName);
                res.redirect('/CodePage');
            }else{
                const error = "there was an issue with your username or password";
                res.render('Login',{error});//this is wrong
            }
        }

    });
}

function insertUser(req,res){//not done

    const UserName = req.body.UserName;
    const Password = req.body.Password;

    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Major = req.body.Major;
    const Email = req.body.Email;

    dbConn.query("INSERT INTO Users (UserName,Password,FirstName,LastName,Major,Email) VALUES (?,?,?,?,?,?)",[UserName,Password,FirstName,LastName,Major,Email],function(err,result){
        
        if(err){
            const error = "User Taken";
            res.render('Register',{error});//this is wrong
        }else{
            console.log("Data inserted");
            res.redirect("/UserRegistered");//this is wrong
        }
    });

}

module.exports = {LogUserIn,insertUser}