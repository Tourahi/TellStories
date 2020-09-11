
//@Desc ensure that the unauthenticated user stays at (/)
const ensureAuth = (req , res , next) => {
  if(req.isAuthenticated()) {
    return next();
  }else{
    res.redirect('/');
  }
}

const keepGest = (req , res , next) => {
  if(req.isAuthenticated()) {
    res.redirect('/dashboard');
  }else{
    return next();
  }
}



module.exports = {
  'ensureAuth' : ensureAuth,
  'keepGest'   : keepGest
}
