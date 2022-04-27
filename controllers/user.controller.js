const db = require('../db');
const shortid = require('shortid');

module.exports.index = (req,res)=>{
    res.render('users/index',{
        users: db.get('users').value()
    });
};
module.exports.search = (req, res) =>{
    var q = req.query.q;
    try{
        var matcheUsers =  db.get('users').value().filter(function (user) {
            return user.name.toLowerCase().indexOf(q.toLocaleLowerCase()) !== -1;
        });
        res.render('users/index', {
            users: matcheUsers
        });
    }catch(e){
        res.json(e);
    }
};

module.exports.create = (req, res) =>{
    res.render("users/create");
};
module.exports.get = (req,res) => {
    var id = req.params.id;
    var users = db.get('users').find({id:id}).value();
    res.render('users/view', {
        users: users
    });
};
module.exports.postCreate = (req, res) =>{
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users");
};