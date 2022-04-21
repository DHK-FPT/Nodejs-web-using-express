const express = require('express');
const app = express();
const port = 80;

app.set('view engine' ,'pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public')); //static files

app.get("/", (req, res) => {
    res.render('index');
});
app.get('/user', (req, res) => {
    res.render('users/index',{
        users: [
            {id: 1,name:'hung'},
            {id: 2,name:'minh'}
        ]
    });
});

app.listen(port, () => {
    console.log("Port "+port);
})