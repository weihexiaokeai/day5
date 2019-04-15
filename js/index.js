const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const server = http.createServer((request, response) => {
    var data = require("./views/data.json");
    let view = null;
    let local = request.url;
    let page = url.parse(local, true).query; //没有后缀
    console.log(page)
    local = url.parse(local).pathname;
    if (request.url == "/favicon.ico") return;
    local = local == "/" ? "/index.html" : local;
    if (path.extname(local)) {
        let filepath = path.join(__dirname, "views", local);
        view = fs.readFileSync(filepath);
        response.end(view);
    } else {
        if (local == "/ppp") {
            response.end(JSON.stringify(data))
        }
        if (local == "/aaa") {
            data.forEach((item, i) => {
                if (item.id == page.id) {
                    data.splice(i, 1)
                }
            })
            fs.writeFileSync("./views/data.json", JSON.stringify(data))
            response.end(JSON.stringify(data))
        }
        if (local == "/bbb") {
            data.forEach((item, i) => {
                if (item.id == page.id) {
                    // item.age = 1234
                    data.splice(i, 1, page)
                }
            })
            fs.writeFileSync("./views/data.json", JSON.stringify(data))
            response.end(JSON.stringify(data))
        }
        if (local == "/ccc") {
            data.push(page)
            console.log(page)
            fs.writeFileSync("./views/data.json", JSON.stringify(data))
            response.end(JSON.stringify(data))
        }
    }
})
const port = 8000;
server.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})