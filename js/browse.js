// ============================================
// 标签页 + 归档页 —— 由 tags.html / archive.html 加载
// ============================================

(function () {
  // 与 main.js 保持一致的日期格式化
  function formatDate(d) {
    var parts = d.split("-");
    if (parts.length !== 3) return d;
    return parts[0] + " 年 " + parseInt(parts[1], 10) + " 月 " + parseInt(parts[2], 10) + " 日";
  }

  var posts = (typeof POSTS !== "undefined" ? POSTS : []).slice().sort(function (a, b) {
    return b.date.localeCompare(a.date);
  });

  // 文章卡片模板（与 main.js 保持一致）
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

  function renderList(listEl, listToShow) {
    if (listToShow.length === 0) {
      listEl.innerHTML = '<p class="empty-tip">这个标签下还没有文章。</p>';
      return;
    }
    listEl.innerHTML = listToShow.map(postCard).join("");
  }

  // ---------- 标签页 ----------
  var cloud = document.getElementById("tag-cloud");
  var list = document.getElementById("post-list");

  if (cloud && list) {
    // 统计每个标签的文章数
    var counts = {};
    posts.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        counts[t] = (counts[t] || 0) + 1;
      });
    });

    function renderChips(activeTag) {
      var chips =
        '<button class="tag-chip' + (!activeTag ? " active" : "") + '" data-tag="">全部（' + posts.length + "）</button>";
      Object.keys(counts).forEach(function (t) {
        chips +=
          '<button class="tag-chip' + (t === activeTag ? " active" : "") + '" data-tag="' + t + '">' +
          t + "（" + counts[t] + "）</button>";
      });
      cloud.innerHTML = chips;
    }

    function setTag(tag) {
      renderChips(tag);
      var filtered = tag
        ? posts.filter(function (p) {
            return (p.tags || []).indexOf(tag) !== -1;
          })
        : posts;
      renderList(list, filtered);
    }

    cloud.addEventListener("click", function (e) {
      var chip = e.target.closest(".tag-chip");
      if (chip) setTag(chip.getAttribute("data-tag"));
    });

    // 支持从别的页面跳过来（如 tags.html?tag=随笔）
    var param = new URLSearchParams(location.search).get("tag");
    setTag(param ? decodeURIComponent(param) : "");
  }

  // ---------- 归档页 ----------
  var archive = document.getElementById("archive-list");
  if (archive) {
    if (posts.length === 0) {
      archive.innerHTML = '<p class="empty-tip">还没有文章，敬请期待～</p>';
    } else {
      // 按年份分组
      var byYear = {};
      posts.forEach(function (p) {
        var year = p.date.slice(0, 4);
        (byYear[year] = byYear[year] || []).push(p);
      });

      var html = "";
      Object.keys(byYear)
        .sort(function (a, b) {
          return b.localeCompare(a);
        })
        .forEach(function (year) {
          html += '<h2 class="archive-year">' + year + " 年（" + byYear[year].length + " 篇）</h2>";
          html += '<div class="archive-posts">';
          byYear[year].forEach(function (p) {
            var shortDate = p.date.slice(5).replace("-", " 月 ") + " 日";
            html +=
              '<div class="archive-post">' +
              '<time datetime="' + p.date + '">' + shortDate + "</time>" +
              '<a href="post.html?p=' + p.slug + '">' + p.title + "</a>" +
              "</div>";
          });
          html += "</div>";
        });
      archive.innerHTML = html;
    }
  }
})();
