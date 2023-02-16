const express = require('express');
const path = require('path');
const db = require('./config');
const bodyParser = require('body-parser');
const app = express();
const route = express.Router();
const port = parseInt(process.env.port) || 4000;

app.use(
    route,
    express.json,
    bodyParser.urlencoded({extended: false}),
);

route.get('/', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, './views/index.html'));
});

route.get('/login', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, './views/login.html'));
});

route.get('/register', (req, res) =>{
    res.status(200).sendFile(path.join(__dirname, './views/register.html'));
});

route.put('/products/:prodID', bodyParser.json(), (req, res) =>{
       res.status(200).json({msg: "affected row"} ); 
             console.log(req.body);
       });

route.post('/register', bodyParser.json(),(req,res)=> {
        let detail = req.body;
        console.log(detail);
        db.query(
            `INSERT INTO anythingUsers
         SET ?;`
         , [detail], (err)=> {
            if(err) {
                res.status(400).send({err});
            }else {
                res.status(200).json({message: "user record"});
            };
        })
    })
       
route.delete('/products/:prodID', bodyParser.json(), (req, res) =>{
    res.status(200).json({msg: "DELETE"} ); 
        console.log(req.body);
    })

route.patch('/login', bodyParser.json(), (req, res) => {
    
})    

app.listen(port, () => {
    console.log(`Server running ${port}`);
})