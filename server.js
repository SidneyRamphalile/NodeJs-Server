const http = require("http");   // Importing the http module for creating a server

const port = 8081;  // Setting the port number for the server

http    // Creating a server using http.createServer method
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" }); // Setting the HTTP response header with status code 200 and content type as text/html
    res.write("<h2> Hey server started, you may now proceed :) </h2>"); // Writing a message to the response body
    res.end(); // Ending the response
  })
  
  .listen(port, () => {     // Listening on the specified port for incoming connections  
    console.log(`NodeJs Server Started Running On Port ${port}`); // Logging a message to the console when the server starts
  });

// URL to access the server locally
// http://localhost:8081
