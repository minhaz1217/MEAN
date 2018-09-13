
var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");

var Post = mongoose.model("Post");


router.use(function(req,res, next){
    if(req.method == 'GET'){
        // continuez to the next middleware or request handler.
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

    //console.log("HELLO");
    Post.find(function(err, data){
        if(err){
            //console.log("ERR");
            return res.send(500, err);
        }
        
        ////console.log("ERR2");
        return res.send(200, data);
    });
    
    //res.send({message:"TODO RETURN ALL POSTS"});
})

.post(function(req, res){
    var post = new Post();
    post.text = req.body.text;
    post.username = req.body.created_by;
    post.save(function(err, post){
        if(err){
            return res.send(500,err);
        }
        return res.json(post);
    });
    //todo
    //return res.send({message:"TODO Create a new post"});
});

router.route("/posts/:id")
    .get(function(req, res){

        Post.findById(req.params.id, function(err, post){
            if(err){
                res.send(err);
            }
            res.json(post);
        });

        //res.send({message: "TODO return POST with id " + req.params.id});
    })
    //modifies or update existing posts
    .put(function(req, res){
        Post.findById(req.params.id, function(err, post){
            if(err){
                res.send(err);
            }
            post.username = req.body.created_by;
            post.text = req.body.text;
            post.save(function(err, post){
                if(err){
                    res.send(err);
                }
                res.json(post);
            });
        });


        //res.send({message: "TODO: modify post with id: " + req.params.id});
    })
    .delete(function(req,res){
        Post.remove({
            _id: req.params.id
        },function(err){
            if(err){
                res.send(err);
            }
            res.json("deleted");
        });
        //res.send({message: "TODO delete the post with id: " + req.params.id});
    });


module.exports = router;