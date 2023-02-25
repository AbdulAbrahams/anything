const express = require('express');
const path = require('path');
const db = require('./config');
const bodyParser = require('body-parser');
const app = express();
const route = express.Router();
const port = parseInt(process.env.port) || 4000;
const bcrypt = require('bcrypt');
// const { Auth } = require('./views/JWT');
// const encoder = bodyParser.urlencoded();

app.use(
    route,
    express.json(),
    express.urlencoded(),
    express.static('views'),
    bodyParser.json(),
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

route.post('/login', bodyParser.json(), async (req,res)=> {
    let { userEmail, userPass } = (req.body);
    console.log({ userEmail, userPass });
    // sql query
    db.query(`SELECT userEmail, userPass from anythingUsers where userEmail = '${userEmail}';`, [userEmail, userPass], (err)=> {
        if(err) {
            res.status(400).json({err});
            console.log(err);
        }else {
            console.log('logged in');
            // res.status(200).json({msg: "recorded"})
            res.redirect('/');
        
        }
    }) 
})



    route.post('/register', bodyParser.json(), (req,res)=> {
        let detail = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPass: req.body.userPass
        };
        console.log(detail);
        // sql query
        db.query(`INSERT INTO anythingUsers SET ?`, [detail], (err)=> {
            if(err) {
                res.status(400).json({err});
            }else {
                console.log('registered');
                // res.status(200).json({msg: "recorded"})
                res.redirect('/login')
            }
        })
    })
       
    route.delete('/user/:id', bodyParser.json(), (req,res)=> {
        let detail = req.params.id;
        console.log(detail);
        // sql query
        db.query(`delete from anythingUsers where userID = ?`, [detail], (err)=> {
            if(err) {
                res.status(400).json({err});
            }else {
                res.status(200).json({msg: "deleted"})
            }
        })
    })

    route.put('/user/:id', bodyParser.json(), (req,res)=> {
        let userID = req.params.id;
        let detail = {
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPass: req.body.userPass
        };
        console.log(detail);
        // sql query
        db.query(`UPDATE anythingUsers SET ? where userID = '${userID}';`, [detail, userID], (err)=> {
            if(err) {
                res.status(400).json({err});
            }else {
                res.status(200).json({msg: "edited"})
                console.log('edited');
            }
        })
    })

// route.patch('/login', bodyParser.json(), (req, res) => {
    
// })    

app.listen(port, () => {
    console.log(`Server running ${port}`);
})