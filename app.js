const path      = require('path');
const express   = require('express');
const dotenv    = require('dotenv');
const connectDB = require('./config/db');
const morgan    = require('morgan');
const expHBS    = require('express-handlebars');
const passport  = require('passport');
const session   = require('express-session');



//Load config
dotenv.config({ path : './config/config.env'});

//Passport config
require('./config/passport')(passport);

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

//  Sessions
app.use(session({
  secret: 'keyboard caty cat',
  resave: false,
  saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder

app.use(express.static(path.join(__dirname , 'public')));



app.set('view engine', '.hbs');

//Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));


app.listen(
  PORT ,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}
  DB name : ${process.env.DBNAME}`)
);
