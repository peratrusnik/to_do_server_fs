const http = require("http");
const port = 5000;
const db = require("./database.json")
const fs = require("fs");
const headers = {
    "Access-Control-Allow-Origin": "*"
}
const server = http.createServer((req, res) => {
    res.writeHead("200", headers)
    if (req.url === "/getData") {
        res.end(JSON.stringify(db))
    } else if (req.url === "/changeStatus" && req.method === "POST") {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", () => {
            let podaci = JSON.parse(body)
            db[podaci.id].status = podaci.status
            dbJson = JSON.stringify(db)
            fs.writeFileSync("./database.json", dbJson)
            res.end(dbJson)
        })
    } else if (req.url === "/addTask" && req.method === "POST") {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })
        req.on("end", () => {
            let podaci = JSON.parse(body)
            podaci.id = db.length
            podaci.status = false
            db.push(podaci);
            dbJson = JSON.stringify(db)
            fs.writeFileSync("./database.json", dbJson)
            res.end(dbJson)
        })
    } else {
        res.end("Nema podataka")
    }
})


server.listen(port, () => {
    console.log("Server running on port " + port);
    console.log("http://localhost:" + port)
})


