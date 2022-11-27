const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  //  console.log(request.url, request.method, request.headers)
  /*
  response.setHeader("Content-Type", "text/html");
  response.write(`
        <html>
           <head>
              <title>My First Page</title>
              <style>
                 h1 {
                    font-family: sans-serif;
                    color: blue;
                    text-decoration: underline;
                 }
              </style>
           </head>
           <body>
              <h1>
                 This is my fucking project!
              </h1>
           </body>
        </html>
    `);
  response.end();
  */
  const url = request.url;
  const method = request.method;

  if (url === "/") {
    response.write(`
         <html>
            <head>
               <title>Enter Message</title>
            </head>
            <body>
               <form action="/message" method="POST">
                  <input type="text" name="message" />
                  <button type="submit">Send</button>
               </form>
            </body>
         </html>
      `);

    return response.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
  }

  //   process.exit();
});

server.listen(3000);
