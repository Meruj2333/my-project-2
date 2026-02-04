console.log()



import 'dotenv/config';
import express, {json} from 'express';
import cors from 'cors';
import session from "express-session";
import { readFile, writeFile } from "fs/promises";
import bcrypt from "bcrypt";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:63342",
    credentials: true
}));
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
app.post('/login', async (req,res)=>{
    const {email,password} = req.body;


    const fileData = await readFile('users.json','utf-8');
    let data = JSON.parse(fileData);

    let user = false;
    if (data[email]) {
         user = await bcrypt.compare(password ,data[email].password);
    }

    if(user){
        req.session.user = user;
        return res.json(user)
    }

    res.status(401).json({message:"Invalid login"})
})
app.get('/', (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        res.json(users);
    } else {
        res.json({message:'not admin'});
    }
});




app.post('/register', async (req, res) => {
    const {name,email,password,isAdmin} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message:'Fill all fields'});
    }
    const heashesPassword = await bcrypt.hash(password,10);

    let val={id:Date.now(), name,email,password:heashesPassword,role:isAdmin?'admin':'user'};

    let data = {};
    try {
        const fileData = await readFile('users.json','utf-8');
        data = JSON.parse(fileData);
    }catch(err) {
        data = {}
    }

    data[val.email] = val;
    await writeFile('users.json', JSON.stringify(data, null, 2));
    const safeUser = {...val};
    delete safeUser.password;
    req.session.user = safeUser;
    res.json(safeUser);
});






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


app.get('/admin', (req, res) => {
    if(req.session.user && req.session.user.role === 'admin'){
        return res.json(users);
    }
    res.status(403).json({message:'Access denied'});
})






const PORT = process.env.PORT || 3001;


app.get('/check/:psw',async (req, res) => {
    const {psw} = req.params;
    const isMatch = await bcrypt.compare(psw,'$2b$10$KnAX47bceEaaQkaJDnxwnO8rZeI6YBpj2x6TkIOfOyGxRPtULpmA.')
    if(isMatch){
        return res.json("chisht email or pass")

    }
    res.json({message:'Access denied'});
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
