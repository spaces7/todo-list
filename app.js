var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://ayush:Cancel-123@ac-ifzlobd-shard-00-00.lzkxdnx.mongodb.net:27017,ac-ifzlobd-shard-00-01.lzkxdnx.mongodb.net:27017,ac-ifzlobd-shard-00-02.lzkxdnx.mongodb.net:27017/?ssl=true&replicaSet=atlas-kfz8g4-shard-0&authSource=admin&retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost/todo_app");
app.use(express.static("public"));
app.use(methodOverride("_method"));

var todoSchema = new mongoose.Schema({
    todo:String
})
var todo = mongoose.model("todo", todoSchema);


app.get("/", function(req, res) {
    todo.find({}, function(err, todos) {
        if(err) {
            console.log("oopsss error " + err);
            res.render("index");
        } else {
            res.render("index",{todos:todos});
        }
    })
})


app.post("/", function(req, res) {
    var add = {todo: req.body.newTodo};
    todo.create(add, function(err, newTodo) {
        if(err) {
            console.log("something went wrong..." + err);
            res.send(req.body.newTodo);
        } else {
            res.redirect("/");
        }
    })
})

app.delete("/", function(req, res) {
    todo.findByIdAndRemove(req.body.todoid, function(err) {
        res.redirect("/");
    })
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Todo list port 3000 started...");
})