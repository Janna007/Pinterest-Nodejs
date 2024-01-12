var express = require('express');
var router = express.Router();
const userModel=require('./users')
const postModel=require('./posts');
const passport = require('passport');

const localStrategy=require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/login" ,(req,res)=>{
  res.render('login')
})

router.get("/feed",(req,res)=>{
  res.render('feed')
})


router.get('/profile',isLoggedIn,(req,res,next)=>{
  res.render('profile')
})

router.post('/register',(req,res)=>{
  const userData = new userModel({
    username, email, fullname
    } = req.body);

    userModel.register(userData,req.body.password)
    .then(()=>{
      passport.authenticate("local")(req,res,()=>{
        res.redirect('/profile')
      })
    })
  
})


router.post("/login" ,passport.authenticate("local",{
  successRedirect:'/profile',
  failureRedirect:"/login"
}) , (req,res)=>{})



router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err) {return next(err)}
    res.redirect("/")
   })
})


function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){ return next()}
  res.redirect("/login")
}

module.exports = router;
