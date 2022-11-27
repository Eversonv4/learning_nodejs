const fs = require("fs");

function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(`
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

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("2_first_server/message.txt", message, (error) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
}

module.exports = {
  handler: requestHandler,
  someText: "Hello darkness my old friend",
};

// ou
// module.exports = requestHandler

// OU também podemos exportar da seguinte forma
/*
 * module.exports.handler = requestHandler;
 * module.exports.someText = "Hello darkness my old friend"
 */

// Assim como também
/*
 * exports.handler = requestHandler;
 * exports.someText = "Hello darkness my old friend"
 */
