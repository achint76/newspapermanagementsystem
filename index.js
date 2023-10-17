const path = require('path');
const express = require('express');
const cors = require('cors');
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

//for magazine console.log(path.join(__dirname, "/uploads"));
const pathStaticsec = path.join(__dirname, "/uploadmagazines");
app.use(express.static(pathStaticsec)); 

const RouterUser = require('./router/userRouter');
const RouterSignup = require('./router/signupRouter');
const RouterLogin = require('./router/loginRouter');
const RouterLogout = require('./router/userRouter');
const RouterForgot = require('./router/forgotpasswordRouter');

const RouterNewspaper = require('./router/newspaperRouter')
const RouterMagazine = require('./router/magazineRouter');
app.use(express.json());
app.use(cors({
  origin: '*',
}));

// Your other routes and middleware go here

// Start your Express app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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
app.use('/user', RouterMagazine);

app.listen(3004, () => {
    console.log(`The server is running on 3004`);   
}); 


