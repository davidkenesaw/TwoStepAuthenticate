# Two Step Authentication

## Description

This is a website that allows you to register a user and loggin, when you log in the application will send you an email with a code. enter code to get access to homepage. There is nothing on homepage, its just to demonstrate register and loggin functionality.


## Technology 

- Node.js
- Express.js
- Sendgrid
- bootstrap
- ejs
- Mysql

## How to get working locally

### prerequisites

- must have your own mysql database connection
- must use your own send grid email
- must create your own secrete key for signed cookies

1. fork this repository and get the code in vs code
2. in the terminal run ``` npm i ```
3. create a .env file and fill it with the code below and replace everything on the right sidde of the equal sign with your info

``` 
DBHOST='database host'
DBPORT='database port'
DBUSER='database username'
DBPASSWORD='database password'
DBDATABASE='database'

EMAIL='email to use with sendgrid'
EMAILKEY='email api key'

SECRETE='cookie secrete' 
```


## Viewing my website online

 visit this link to see my [website](https://two-step-auth.herokuapp.com/)

 something to note is that the email might show up in junk or spam folder when logging in to the website. if it doesnt show up use the send again button

