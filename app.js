const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 80;

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
app.get("/user", (req, res) => {
    res.render('users/index',{
        users: users
    });
});


app.get("/user/search", function (req, res){
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

app.listen(port, () => {
    console.log("Port "+port);
})