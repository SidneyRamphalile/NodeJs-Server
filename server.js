const http = require("http");   // Importing the http module for creating a server

const port = 8081;  // Setting the port number for the server

// HTTP Methods

/*
>> GET:  In order to get data from server
>> POST:  Sending data to server
>> DELETE:  Deleting the data from database
>> PATCH:  Updating certain fields
>> PUT:   Full Update
*/ 

const toDoList = ["learn", "apply things", "succeed"];


http    // Creating a server using http.createServer method
  .createServer((req, res) => {
    const {method, url} = req;
    // console.log(method, url);
    if (url === "/todos"){
        if(method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(toDoList.toString());
        } else if (method === "POST") {
            let body = "";
            req.on('error', (err) => {
                console.log(err);
            }).on('data', (chunk) => {
                body += chunk;
                console.log(chunk);
            }).on('end',() => {
                body = JSON.parse(body);

                let newToDo = toDoList;
                newToDo.push(body.item)
                console.log(newToDo);
                // console.log("data: ", body)
            })
        }  else if (method === "DELETE"){
            let body = '';
            req
              .on("error", (err) => {
                console.error(err);
              })
              .on("data", (chunk) => {
                body += chunk;
              })
              .on("end", () => {
                body = JSON.parse(body);
                let deleteThisItem = body.item;
                for (let i=0; i<toDoList.length; i++) {
                    if (toDoList[i] === deleteThisItem){
                        toDoList.splice(i,1);
                        break;
                    } else {
                      console.error("Error: Match Not Found!");
                      break;
                    }
                }
                // toDoList.find((elem, index) => {
                //   if (elem === deleteThisItem) {
                //     toDoList.splice(index, 1);
                //   } else {
                //     console.error("Error: Match Not Found");
                //     // console.exit();
                //   }
                // });
              });
        }      
        else {
            res.writeHead(501);
        }
    }  else {
        res.writeHead(404);
    }
    res.end();
    // res.writeHead(200, { "Content-Type": "text/html" }); // Setting the HTTP response header with status code 200 and content type as text/html
    // res.write("<h2> Hey server started, you may now proceed :) </h2>"); // Writing a message to the response body
    // res.end(); // Ending the response
  })
  
  .listen(port, () => {     // Listening on the specified port for incoming connections  
    console.log(`NodeJs Server Started Running On Port ${port}`); // Logging a message to the console when the server starts
  });

// URL to access the server locally
// http://localhost:8081
