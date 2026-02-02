import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from "express-session";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
    session({
        secret: 'My session',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000*60*60},
    })
)

let users = [
    {id:1,login:'mery@gmail.ru',password:'1234',role:'admin'}

];

app.get('/', (req, res) => {
    if (req.session.user.role == 'admin') {
        res.json(users);

    }else{
        res.json({message:'not admin'});
    }
});

app.get('/login', (req, res) => {
    const {login,password} = req.query;
   let usersValues=users.find(user=>user.login.toLowerCase()===login.toLowerCase() && user.password===password);
   if(usersValues){
       let newUser = {
           ...usersValues
       }
       delete newUser.password;
       req.session.user = newUser;
       return res.json(newUser);
   }else{
       res.json({message:'Login not found'});
   }


})
app.post('/register', (req, res) => {
    const {name,email,login,password} = req.body;
    let val={id:Date.now(), name,email,login,password,role:'user'}
    users.push(val)
    let newValue={
        ...val
    }
    delete newValue.password;
    req.session.user = {
        newValue
    };

res.json(users);


})










app.get('/profile', (req, res) => {
    if(req.session.user){
        return res.json(req.session.user);
    }
        res.json({message:'No logged in'});

})
app.get('/logout', (req, res) => {
    if(req.session.user){
        req.session.user = null;
        return res.json("Logged out");
    }
    res.json({message:'No logged out'});

})





const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
