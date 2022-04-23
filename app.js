const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const app = express();

const port = 80;

const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] })
  .write();

app.set('view engine' ,'pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public')); //static files

var users = [
    {id: 1,name:'hung'},
    {id: 2,name:'minh'}
];
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/users", (req, res) => {
    res.render('users/index',{
        users: db.get('users').value()
    });
});


app.get("/users/search", (req, res) =>{
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

app.get("/users/create", (req, res) =>{
    res.render("users/create");
});
app.post("/users/create", (req, res) =>{
    db.get('users').push(req.body).write();
    res.redirect("/users");
});

app.listen(port, () => {
    console.log("Port "+port);
})