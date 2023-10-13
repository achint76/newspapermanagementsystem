const path = require('path');
const express = require('express');
const app = express();
const newspaperController = require('./controller/newspaperController')
//builtin middleware
//console.log(__dirname);
console.log(path.join(__dirname, "/public"));
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));

console.log(path.join(__dirname, "/uploads"));
const pathStatic = path.join(__dirname, "/uploads");
app.use(express.static(pathStatic)); 

const RouterUser = require('./router/userRouter');
const RouterSignup = require('./router/signupRouter');
const RouterLogin = require('./router/loginRouter');
const RouterLogout = require('./router/userRouter');
const RouterForgot = require('./router/forgotpasswordRouter');

const RouterNewspaper = require('./router/newspaperRouter')
app.use(express.json());


app.get('/', (req,res) => {
  console.log("get response");
  res.send('API is running...');
})

app.use('/user', RouterUser);
app.use('/user', RouterLogin);
app.use('/user', RouterSignup);
app.use('/user', RouterLogout);
app.use('/user', RouterForgot);
app.use('/user', RouterNewspaper);

app.listen(3004, () => {
    console.log(`The server is running on 3004`);   
}); 


