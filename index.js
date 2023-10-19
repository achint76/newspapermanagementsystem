const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const newspaperController = require('./controller/newspaperController')
//builtin middleware
//console.log(__dirname);
const staticPath = path.join(__dirname, "/public");
console.log(staticPath);
app.use(express.static(staticPath));

console.log(path.join(__dirname, "/uploads"));
const pathStatic = path.join(__dirname, "/uploads");
app.use(express.static(pathStatic)); 

//for magazine console.log(path.join(__dirname, "/uploads"));
const pathStaticsec = path.join(__dirname, "/uploadmagazines");
app.use(express.static(pathStaticsec)); 



const RouterUser = require('./router/userRouter');
const RouterSignup = require('./router/signupRouter');
const RouterLogin = require('./router/loginRouter');
const RouterLogout = require('./router/userRouter');
const RouterForgot = require('./router/forgotpasswordRouter');

const RouterNewspaper = require('./router/newspaperRouter');
const RouterMagazine = require('./router/magazineRouter');
app.use(express.json());
app.use(cors({
  origin: '*',
}));

// Your other routes and middleware go here

// Start your Express app

app.get('/user/forgot-password', (req,res) => {
  console.log("get response");
  res.sendFile(path.join(__dirname,"public/index.html"));
})

app.use('/user', RouterUser);
app.use('/user', RouterLogin);
app.use('/user', RouterSignup);
app.use('/user', RouterLogout);
app.use('/user', RouterForgot);
app.use('/user', RouterNewspaper);
app.use('/user', RouterMagazine);

app.listen(3004, () => {
    console.log(`The server is running on 3004`);   
}); 


