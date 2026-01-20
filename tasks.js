//TASK 1
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === "/complain") {

        const name = url.searchParams.get("name");
        const issue = url.searchParams.get("issue");
        const priority = url.searchParams.get("priority");

        const ticketId = "TKT-" + Math.floor(Math.random() * 10000);
        const line = ticketId + " | " + name + " | " + issue + "\n";

        if (priority === "high") {
            fs.appendFile("URGENT.txt", line, () => {});
        } else {
            fs.appendFile("normal_complaints.txt", line, () => {});
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            ticket: ticketId,
            message: "We will solve your issue soon."
        }));

        return;
    }

    if (url.pathname === "/admin") {

        const user = url.searchParams.get("user");
        const pass = url.searchParams.get("pass");

        if (user === "admin" && pass === "1234") {

            fs.readFile("admin_dashboard.html", "utf8", (err, data) => {
                if (err) {
                    res.writeHead(500);
                    return res.end("Server Error");
                }

                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            });

        } else {
            res.writeHead(401);
            res.end("Access Denied.");
        }

        return;
    }

    res.writeHead(2);
    res.end("PIYUSH THAKUR");
});

server.listen(8000, () => {
    console.log("Server running on port 8000");
});

//TASK 2
/*task2 */
const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const PORT = 8000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/admin") {
    const { user, pass } = parsedUrl.query;

    if (user === "admin" && pass === "1234") {
      const filePath = path.join(__dirname, "admin_dashboard.html");

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Server Error");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } else {
      res.writeHead(401, { "Content-Type": "text/plain" });
      res.end("Access Denied.");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
