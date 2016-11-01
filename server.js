var express = require("express");
var bodyParser = require("body-parser");
var _ =require("underscore");

var app = express();
var PORT = process.env.PORT || 3000; //used for heroku

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
//Get /todos
app.get("/todos", function(req,res){
	res.json(todos);
});

//Get /todos/:id
app.get("/todos/:id", function(req,res){ //colons only used for url
	var todoId = parseInt(req.params.id, 10); //req.params. id is always a string
	var matchedTodo = _.findWhere(todos,{id: todoId});
	// var matchedTodo;
	
	// //Iterate of todos aray
	// todos.forEach(function(todo){
	// 	if (todoId === todo.id){
	// 		matchedTodo = todo;
	// 	}
	// });

	if (matchedTodo){
		res.json(matchedTodo); //shortcut to send back json data
	} else {
		res.status(404).send(); //sends status message
	}

	//res.send("Asking for todo with id of " + req.params.id)
});

//POST - can take data 
//  /todos
app.post("/todos", function(req,res) {
	//var body = req.body; 
	var body = _.pick(req.body, "description", "completed");

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send(); //bad  data provided
	}

	body.description = body.description.trim();

	// add id field
	body.id = todoNextId++;

	// push body into array
	todos.push(body);

	console.log("description: " + body.description);

	res.json(body);
});


app.get("/", function(req,res){
	res.send("Todo API Root");
});

// DELETE /todos/:id
app.delete("/todos/:id", function(req,res){
	var todoId = parseInt(req.params.id, 10); //req.params. id in url is always a string 
	var matchedTodo = _.findWhere(todos,{id: todoId});

	if (!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo);
	}
});

app.listen(PORT, function(){
	console.log("Express listening on port " + PORT);
})