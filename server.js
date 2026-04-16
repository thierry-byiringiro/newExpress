import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200
      break;
    default:
      path += "notFound.html";
      res.statusCode = 404
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server's running");
});
