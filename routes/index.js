var express = require('express');
var router = express.Router();
var posts = [];

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
})





module.exports = router;
