// ============================================
// 首页文章列表渲染 —— 一般不需要修改
// ============================================

(function () {
  var list = document.getElementById("post-list");
  if (!list) return;

  // 把 2026-10-05 格式化成「2026 年 10 月 5 日」
  function formatDate(d) {
    var parts = d.split("-");
    if (parts.length !== 3) return d;
    return parts[0] + " 年 " + parseInt(parts[1], 10) + " 月 " + parseInt(parts[2], 10) + " 日";
  }

  // 按日期从新到旧排序
  var posts = (window.POSTS || []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  if (posts.length === 0) {
    list.innerHTML = '<p class="empty-tip">还没有文章，敬请期待～</p>';
    return;
  }

  list.innerHTML = posts
    .map(function (p) {
      var url = "posts/" + p.slug + ".html";
      var tags = (p.tags || [])
        .map(function (t) {
          return '<span class="tag">' + t + "</span>";
        })
        .join("");
      return (
        '<article class="post-card">' +
        '<time class="post-date" datetime="' + p.date + '">' + formatDate(p.date) + "</time>" +
        '<h3 class="post-title"><a href="' + url + '">' + p.title + "</a></h3>" +
        '<p class="post-excerpt">' + p.excerpt + "</p>" +
        '<div class="post-meta">' +
        tags +
        '<a class="read-more" href="' + url + '">阅读全文 →</a>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");
})();
