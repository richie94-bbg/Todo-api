var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000; //used for heroku

var todos = [{
	id: 1, 
	description: " Meet mom for lunch",
	completed : false
}, {
	id: 2,
	description: "Go to market",
	completed : false
},{
	id: 3,
	description: "Make money",
	completed: true
}];

//Get /todos
app.get("/todos", function(req,res){
	res.json(todos);
});

//Get /todos/:id
app.get("/todos/:id", function(req,res){ //colons only used for url
	var todoId = parseInt(req.params.id, 10); //req.params. id is always a string
	var matchedTodo;
	
	//Iterate of todos aray
	todos.forEach(function(todo){
		if (todoId === todo.id){
			matchedTodo = todo;
		}
	});

	if (matchedTodo){
		res.json(matchedTodo); //shortcut to send back json data
	} else {
		res.status(404).send(); //sends status message
	}

	//res.send("Asking for todo with id of " + req.params.id)
});

app.get("/", function(req,res){
	res.send("Todo API Root");
});

app.listen(PORT, function(){
	console.log("Express listening on port " + PORT);
})