const path      = require('path');
const express   = require('express');
const dotenv    = require('dotenv');
const connectDB = require('./config/db');
const morgan    = require('morgan');
const expHBS    = require('express-handlebars');
const passport  = require('passport');
const session   = require('express-session');
const MongoSessionStore = require('connect-mongo')(session);
const mongoose  = require('mongoose');
const methodOverride = require('method-override');

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
const { formatDate,
        truncate,
        stripTags,
        editIcon,
        select } = require('./helpers/hbs');

app.engine('.hbs', expHBS(
  {
    extname : '.hbs',
    layoutsDir: './views/layouts',
    defaultLaout : 'login',
    helpers : {
      formatDate,
      truncate,
      stripTags,
      editIcon,
      select
    }
  }
));


//  Sessions
app.use(session({
  secret: 'keyboard caty cat',
  resave: false,
  saveUninitialized: false,
  store  : new MongoSessionStore( {mongooseConnection : mongoose.connection })
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set globals
app.use(function (req,res,next) {
  res.locals.user = req.user || null;
  next();
});

//Other middleware
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//Static folder
app.use(express.static(path.join(__dirname , 'public')));


app.set('view engine', '.hbs');

//Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));

app.listen(
  PORT ,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}
  DB name : ${process.env.DBNAME}`)
);
