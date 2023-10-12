const path = require('path');
const express = require('express');
const app = express();
//builtin middleware
//console.log(__dirname);
console.log(path.join(__dirname, "/public"));
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath))

const RouterUser = require('./router/userRouter');
const RouterSignup = require('./router/signupRouter');
const RouterLogin = require('./router/loginRouter');
const RouterLogout = require('./router/userRouter');
const RouterForgot = require('./router/forgotpasswordRouter');
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

app.listen(3004, () => {
    console.log(`The server is running on 3004`);   
}); 