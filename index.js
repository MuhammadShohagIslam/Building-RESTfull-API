/*
    Primary File in the API
*/

// Dependencies
const https = require("https");
const http = require("http");
const StringDecoder = require("string_decoder").StringDecoder;
const url = require("url");
const fs = require("fs");
const config = require("./config");

// instantiate the HTTP server
const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});

// start the HTTP server
httpServer.listen(config.httpPort, () => {
    console.log(
        `The server is up and running on port ${config.httpPort} in ${config.envName} mode`
    );
});

// instantiate the HTTPS server
const httpsServerOption = {
    key: fs.readFileSync("./https/key.pem"),
    cert: fs.readFileSync("./https/cert.pem"),
};
const httpsServer = https.createServer(httpsServerOption, function (req, res) {
    unifiedServer(req, res);
});

// start the HTTPS Server
httpsServer.listen(config.httpsPort, function () {
    console.log(
        `The server is up and running on port ${config.httpsPort} in ${config.envName} mode`
    );
});

// all the server logic for both the http and https server
const unifiedServer = function (req, res) {
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

        // cheack the router for the matching path a handler, if can not get matching router, provide not found handler
        const choosenHandler =
            typeof router[trimedPath] !== "undefined"
                ? handlers[trimedPath]
                : handlers.notFound;

        // constract the data to the send request handler
        const data = {
            trimedPath,
            method,
            queryStringObject,
            headers,
            payload: buffer,
        };
        // route the request to the handler specified in the router
        choosenHandler(data, function (statusCode, payload) {
            // use the status code returned from the handler or set the default status code to 200
            statusCode = typeof statusCode === "number" ? statusCode : 200;

            // use the payload retured from the handler or set the default payload empty object
            payload = typeof payload === "object" ? payload : {};

            // converted to the object to string
            const stringPayload = JSON.stringify(payload);

            // return response
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            res.end(stringPayload);
            console.log("Return the response: ", statusCode, stringPayload);
        });
    });
};

// define the all handlers
const handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
    callback(402, { name: "Master Node JS" });
};

// not found handler
handlers.notFound = function (data, callback) {
    callback(404);
};

// define the request router
const router = {
    sample: handlers.sample,
};
/*
    *** Theory ***
    /* 
        true: to parse the query string, call only query string module. 
        const parseUrl = url.parse(req.url, true)
    //
*/
