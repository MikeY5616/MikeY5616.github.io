// ============================================
// 本地预览服务器 —— 双击 serve.bat 或运行 node serve.js
// 启动后用浏览器打开 http://localhost:8765
// （文章页需要加载 .md 文件，直接双击 HTML 文件预览不了，
//   所以提供这个小服务器，和线上环境行为一致）
// ============================================

var http = require("http");
var fs = require("fs");
var path = require("path");

var types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http
  .createServer(function (req, res) {
    var f = decodeURIComponent(req.url.split("?")[0]);
    if (f === "/") f = "/index.html";
    try {
      var data = fs.readFileSync(path.join(__dirname, f));
      res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" });
      res.end(data);
    } catch (e) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 文件不存在: " + f);
    }
  })
  .listen(8765, function () {
    console.log("本地预览已启动：http://localhost:8765 （按 Ctrl+C 退出）");
  });
