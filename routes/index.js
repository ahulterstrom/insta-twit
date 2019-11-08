var express = require('express');
var router = express.Router();
var posts = [];
var users = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {
    console.log("get posts...");
    res.status(200).json(posts);
    return;
});

router.post('/submituserpost', function(req,res){
    console.log("new post request");
    console.log(req.body);
    var userpost = req.body;
    posts.push(userpost);
    res.send('Adding your post');
    return;
});

router.post('/newuser', function(req,res){
    console.log("new user request");
    console.log(req.body);
    var newuser = req.body;
    if(usernameistaken(newuser.username)){
        res.send(false);
    }
    else{
        users.push(newuser);
        res.send(true);
    }
    return;
});

router.post('/login', function(req,res){
    console.log("log in request");
    console.log(req.body);
    var user = req.body;
    if(usernamepasswordmatch(user)){
        res.send(true);
    }
    else{
        res.send(false);
    }
    return;
});



module.exports = router;



function usernameistaken(name){
    for(var i=0;i<users.length;i++){
        if(users[i].username == name){
            return true;
        }
    }
    return false;
}

function usernamepasswordmatch(user){
    for(var i=0;i<users.length;i++){
        if(users[i].username == user.username){
            if(users[i].password == user.password){
                return true;
            }
            else{
                return false; //wrong password
            }
        }
    }
    return false; //wrong username
}