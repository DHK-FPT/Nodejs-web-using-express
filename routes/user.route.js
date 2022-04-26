const express = require('express');
const router = express.Router();
const db = require('../db');

const shortid = require('shortid');
router.get("/", (req, res) => {
    res.render('users/index',{
        users: db.get('users').value()
    });
});


router.get("/search", (req, res) =>{
    var q = req.query.q;
    try{
        var matcheUsers =  users.filter(function (user) {
            return user.name.toLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
        });
        res.render('users/index', {
            users: matcheUsers
        });
    }catch(e){
        res.json(e);
    }

});

router.get("/create", (req, res) =>{
    res.render("users/create");
});

router.get('/:id', (req,res) => {
    var id = req.params.id;

    var users = db.get('users').find({id:id}).value();
    res.render('users/view', {
        users: users
    });
});

router.post("/create", (req, res) =>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users");
});

module.exports = router;
