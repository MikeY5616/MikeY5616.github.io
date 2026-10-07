// ============================================
// 首页文章列表渲染 + 搜索 —— 一般不需要修改
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
  // 注意：posts.js 里用 const 定义 POSTS，不会挂到 window 上，要直接引用
  var posts = (typeof POSTS !== "undefined" ? POSTS : []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  // 单篇文章卡片
  function postCard(p) {
    var url = "post.html?p=" + p.slug;
    var tags = (p.tags || [])
      .map(function (t) {
        return '<a class="tag" href="tags.html?tag=' + encodeURIComponent(t) + '">' + t + "</a>";
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
  }

  function render(listToShow) {
    if (listToShow.length === 0) {
      var searching = searchInput && searchInput.value.trim() !== "";
      list.innerHTML = searching
        ? '<p class="empty-tip">没有找到相关文章，换个关键词试试～</p>'
        : '<p class="empty-tip">还没有文章，敬请期待～</p>';
      return;
    }
    list.innerHTML = listToShow.map(postCard).join("");
  }

  // ---------- 搜索 ----------
  var searchInput = document.getElementById("search-input");

  render(posts);

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim().toLowerCase();
      if (!q) {
        render(posts);
        return;
      }
      var filtered = posts.filter(function (p) {
        var haystack = (p.title + " " + p.excerpt + " " + (p.tags || []).join(" ")).toLowerCase();
        return haystack.indexOf(q) !== -1;
      });
      render(filtered);
    });
  }
})();
