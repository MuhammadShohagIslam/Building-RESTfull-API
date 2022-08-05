/*
    Primary File in the API
*/

// Dependencies
const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;
const url = require("url");

// The server should response to all requests with a string
const servre = http.createServer((req, res) => {
    // Get the url and parse it
    const parseUrl = url.parse(req.url, true);
    // Get the path
    const path = parseUrl.pathname; // /books/1
    const trimedPath = path.replace(/^\/+|\/+$/g, ""); // books/1
    // Get the HTTP method
    const method = req.method.toLowerCase(); // get

    // Get query string as an object
    const queryStringObject = parseUrl.query;

    // Get the headers as an object
    const headers = req.headers;

    // Get the payload if any
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", function (data) {
        buffer += decoder.write(data);
    });
    req.on("end", function () {
        buffer += decoder.end();
        res.end("Ok!");
        console.log(headers);
    });
});
// Start the server, and it listen on port 5000
servre.listen(5000, () => {
    console.log("Server is the listen on port 5000, now!");
});

/*
    *** Theory ***
    /* 
        true: to parse the query string, call only query string module. 
        const parseUrl = url.parse(req.url, true)
    //
*/
