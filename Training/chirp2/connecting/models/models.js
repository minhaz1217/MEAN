var mongoose = require("mongoose");


var userSchema = new mongoose.Schema({
    username: String,
    password: String, 
    created_at : {type: Date, default: Date.now}
});

var postSchema = new mongoose.Schema({
    text: String,
    username : String,
    created_at : {type:Date, default: Date.now}
});

// declearing a model called user which has schema userSchema
mongoose.model("User",userSchema);
mongoose.model("Post", postSchema);