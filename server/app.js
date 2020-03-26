const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routes/userRouter');

app.use('/user', userRouter);



app.get('/', (req, res, next) => {
    res.end('GOOD!!!')
});

app.use('*', (req, res) => {
    res.status(404).json('Page not found!!!!!!!!');
});

app.listen(3000, () => {
    console.log('CONNECTED!!');
});
