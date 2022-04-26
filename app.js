const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoute = require('./routes/user.route');

const port = 80;

app.set('view engine' ,'pug');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public')); //static files

app.use('/users',userRoute);

app.listen(port, () => {
    console.log("Port "+port);
})