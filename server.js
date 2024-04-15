const express = require("express");

const app = express();  // initialize express
app.use(express.json());  // I always want my express application to work in JSON format

const port = 8081; 

const toDoList = ["learn", "apply things", "succeed"];

// http://localhost:8081/todos
app.get("/todos", (req, res) => {
  // res.writeHead(200)
  // res.write(toDoList)
  res.status(200).send(toDoList)
});

app.post("/todos", (req, res) => {
  let newToDoItem = req.body.name;
  toDoList.push(newToDoItem);
  res.status(201).send({message: "Task Added Successfully"});
});

app.delete("/todos", (req, res) => {
 const deleteThisItem = req.body.name;

 toDoList.find((elem, index) => {
  if(elem === deleteThisItem) {
    toDoList.splice(index, 1);
  }
 });
 res.status(202).send({message : `Deleted Item: ${req.body.name}`})
});

app.all("/todos", (req, res) => {
  res.status(501).send();
});

app.listen(port, () => {
  console.log(`NodeJs Server Started Running on Port ${port}`)
});
