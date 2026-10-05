// ============================================
// 文章页渲染 —— 读取 ?p=文件名 参数，加载对应 .md 并渲染
// 一般不需要修改
// ============================================

(function () {
  var params = new URLSearchParams(window.location.search);
  var slug = params.get("p");
  var posts = typeof POSTS !== "undefined" ? POSTS : [];
  var post = null;
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].slug === slug) {
      post = posts[i];
      break;
    }
  }

  var body = document.getElementById("post-body");
  var titleEl = document.getElementById("post-title");
  var dateEl = document.getElementById("post-date");
  var tagsEl = document.getElementById("post-tags");
  var errorEl = document.getElementById("post-error");

  function formatDate(d) {
    var parts = d.split("-");
    if (parts.length !== 3) return d;
    return parts[0] + " 年 " + parseInt(parts[1], 10) + " 月 " + parseInt(parts[2], 10) + " 日";
  }

  function showError(msg) {
    if (titleEl) titleEl.textContent = "文章不见了";
    if (errorEl) {
      errorEl.style.display = "block";
      errorEl.textContent = msg;
    }
    if (body) body.innerHTML = "";
  }

  if (!slug || !post) {
    showError("没有找到这篇文章，可能链接有误或文章已被移除。");
    return;
  }

  // 填标题、日期、标签、浏览器标签页标题
  document.title = post.title + " · 清茶小馆";
  if (titleEl) titleEl.textContent = post.title;
  if (dateEl) {
    dateEl.textContent = formatDate(post.date);
    dateEl.setAttribute("datetime", post.date);
  }
  if (tagsEl && post.tags) {
    tagsEl.innerHTML = post.tags
      .map(function (t) {
        return '<span class="tag">' + t + "</span>";
      })
      .join("");
  }
  var meta = document.querySelector('meta[name="description"]');
  if (meta && post.excerpt) meta.content = post.excerpt;

  // 加载并渲染 Markdown 正文
  fetch("posts/" + slug + ".md")
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(function (md) {
      body.innerHTML = marked.parse(md);
    })
    .catch(function () {
      showError("文章内容加载失败，请确认 posts/" + slug + ".md 文件存在。");
    });
})();
