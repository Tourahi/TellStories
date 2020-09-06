const path = require('path');
const express = require('express');
const dotenv  = require('dotenv');
const connectDB = require('./config/db');
const morgan    = require('morgan');
const expHBS    = require('express-handlebars');



//Load config
dotenv.config({ path : './config/config.env'});

connectDB();

const app = express();
const PORT = process.env.PORT || 3030;

if(process.env.NODE_ENV = 'develepment') {
  app.use(morgan('dev'));
}
//Setting expHBS

app.engine('.hbs', expHBS(
  {
    extname : '.hbs',
    layoutsDir: './views/layouts',
    defaultLaout : 'login'
  }
));

//Static folder

app.use(express.static(path.join(__dirname , 'public')));



app.set('view engine', '.hbs');

//Routes
app.use('/',require('./routes/index'));
app.listen(
  PORT ,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}
  DB name : ${process.env.DBNAME}`)
);
