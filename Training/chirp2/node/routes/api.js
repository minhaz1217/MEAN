
var express = require("express");
var router = express.Router();

router.use(function(req,res, next){
    if(req.method == 'GET'){
        // continue to the next middleware or request handler.
        return next();
    }
    if(!req.isAuthenticated()){
        // user not authenticated, redirect to login page
        return res.redirect('/#login');
    }
    return next();
});


router.route("/posts")
    // request in express takes 2 parameters
.get(function(req, res){
    res.send({message:"TODO RETURN ALL POSTS"});
})

.post(function(req, res){
    //todo
    res.send({message:"TODO Create a new post"});
});

router.route("/posts/:id")
    .get(function(req, res){
        res.send({message: "TODO return POST with id " + req.params.id});
    })
    //modifies or update existing posts
    .put(function(req, res){
        res.send({message: "TODO: modify post with id: " + req.params.id});
    })
    .delete(function(req,res){
        res.send({message: "TODO delete the post with id: " + req.params.id});
    });


module.exports = router;