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

// 注入到文章页的"边写边看"脚本：每 1.5 秒检查 .md 有没有变化，
// 变了就自动重新渲染，不用手动刷新浏览器
var liveScript = [
  "<script>",
  "(function () {",
  '  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;',
  "  var last = null;",
  "  setInterval(function () {",
  '    var p = new URLSearchParams(location.search).get("p");',
  "    if (!p) return;",
  '    fetch("posts/" + p + ".md?_=" + Date.now())',
  "      .then(function (r) { return r.ok ? r.text() : Promise.reject(); })",
  "      .then(function (t) {",
  "        if (last !== null && t !== last) {",
  '          document.getElementById("post-body").innerHTML = marked.parse(t);',
  "        }",
  "        last = t;",
  "      })",
  "      .catch(function () {});",
  "  }, 1500);",
  "})();",
  "</script>"
].join("\n");

http
  .createServer(function (req, res) {
    var f = decodeURIComponent(req.url.split("?")[0]);
    if (f === "/") f = "/index.html";
    try {
      var data = fs.readFileSync(path.join(__dirname, f));
      // 禁止缓存：编辑 .md 后立刻能看到新内容
      res.writeHead(200, {
        "Content-Type": types[path.extname(f)] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      // 文章页注入"边写边看"脚本
      if (f === "/post.html") {
        data = data.toString().replace("</body>", liveScript + "\n</body>");
      }
      res.end(data);
    } catch (e) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 文件不存在: " + f);
    }
  })
  .listen(8765, function () {
    console.log("本地预览已启动：http://localhost:8765 （按 Ctrl+C 退出）");
    console.log("边写边看：浏览器打开文章页，编辑 posts/ 下的 .md 保存后自动刷新");
  });
