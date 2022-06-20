const express = require('express');
const app = express();
const { User } = require('./models');
const port = 3000;

app.use(express.json());

// ===============================
// ========     USER    ==========
// ===============================

app.get("/user", (req,res) => {
    User.findAll().then(user => {res.status(200).json(user)})
})

app.get("/user/:id", (req,res) => {
    User.findOne({
        where : { id: req.params.id}
    }).then(articles =>{res.status(200).json(articles)});
})
app.post("/user", (req,res)=>{
    let name = '';
    User.findAll().then(user => {user.forEach(a => {
        if(a.user_name !== req.body.name){
            User.create({
                user_name : req.body.name,
                user_email: req.body.email,
                user_password: req.body.password
            }).then(user => {res.status(201).json(user)})
            .catch(error => {res.status(400).json(error)})
        }
        else{
            console.log("Boljug");
        }
    })});
    
})

app.put("/user/:id", (req,res) => {
    User.update({
        user_name : req.body.name,
        user_email : req.body.email,
        user_password : req.body.password
    }, {
        where : { id : req.params.id }
    }).then(() => {
        res.status(200).json("User telah diperbaharui")
    }).catch(err => {res.status(500).json(err)})
})

app.delete("/user/:id",(req,res) => {
    User.destroy({
        where : { id : req.params.id }
    }).then(()=>{res.status(200).json("User telah dihapus")}).catch(err => {res.status(500).json(`User Tidak bisa dihapus : ${err}`)})
})


// ===============================
// ========     ITEM    ==========
// ===============================

app.listen(port,()=>{console.log("Server Berjalan")})