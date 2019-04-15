'use strict';

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var server = http.createServer(function (request, response) {
    var data = require("./views/data.json");
    var view = null;
    var local = request.url;
    var page = url.parse(local, true).query; //没有后缀
    console.log(page);
    local = url.parse(local).pathname;
    if (request.url == "/favicon.ico") return;
    local = local == "/" ? "/index.html" : local;
    if (path.extname(local)) {
        var filepath = path.join(__dirname, "views", local);
        view = fs.readFileSync(filepath);
        response.end(view);
    } else {
        if (local == "/ppp") {
            response.end(JSON.stringify(data));
        }
        if (local == "/aaa") {
            data.forEach(function (item, i) {
                if (item.id == page.id) {
                    data.splice(i, 1);
                }
            });
            fs.writeFileSync("./views/data.json", JSON.stringify(data));
            response.end(JSON.stringify(data));
        }
        if (local == "/bbb") {
            data.forEach(function (item, i) {
                if (item.id == page.id) {
                    // item.age = 1234
                    data.splice(i, 1, page);
                }
            });
            fs.writeFileSync("./views/data.json", JSON.stringify(data));
            response.end(JSON.stringify(data));
        }
        if (local == "/ccc") {
            data.push(page);
            console.log(page);
            fs.writeFileSync("./views/data.json", JSON.stringify(data));
            response.end(JSON.stringify(data));
        }
    }
});
var port = 8000;
server.listen(port, function () {
    console.log('server is running at http://localhost:' + port);
});