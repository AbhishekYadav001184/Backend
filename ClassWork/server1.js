const http = require("http");
const students = {
  name: "Abhishek Yadav",
  class: "FD",
  rollNo: 2415000065,
  course: "BTech CS Full Stack Development",
};
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page");
  }
  else if (method === "GET" && url === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(students));
  }
  else if (method === "POST" && url === "/users") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      res.writeHead(201, { "Content-Type": "application/json" });

      res.end(
        JSON.stringify({
          message: "User created successfully",
          receivedData: parsedBody,
        })
      );
    });
  }
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});