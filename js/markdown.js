// ============================================
// 轻量 Markdown 渲染器（自写，无外部依赖）
// 支持的语法：
//   # ~ #### 标题（正文建议从 ## 开始，# 会渲染成大标题）
//   段落（空行分段，段内换行保留）
//   **加粗**  *斜体*  `行内代码`
//   [链接](https://...)  ![图片](images/xx.jpg)
//   - 无序列表   1. 有序列表
//   > 引用
//   ``` 代码块 ```
//   --- 分割线
// 如果以后想换成标准库 marked.js，把本文件的 marked 全局
// 换成 marked.min.js 即可，渲染入口 js/render.js 不用改。
// ============================================

(function (global) {
  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // 行内元素：图片、链接、加粗、斜体、行内代码
  function inline(s) {
    return s
      .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function parse(md) {
    var lines = String(md).replace(/\r\n?/g, "\n").split("\n");
    var html = [];
    var i = 0;
    var para = [];

    function flushParagraph() {
      if (para.length) {
        html.push(
          "<p>" +
            para
              .map(function (l) {
                return inline(escapeHtml(l));
              })
              .join("<br>") +
            "</p>"
        );
      }
      para = [];
    }

    while (i < lines.length) {
      var line = lines[i];

      // 代码块
      if (/^```/.test(line)) {
        flushParagraph();
        var code = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) {
          code.push(lines[i]);
          i++;
        }
        i++; // 跳过结尾的 ```
        html.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
        continue;
      }

      // 分割线
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
        flushParagraph();
        html.push("<hr>");
        i++;
        continue;
      }

      // 标题
      var h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        flushParagraph();
        var level = h[1].length;
        html.push("<h" + level + ">" + inline(escapeHtml(h[2].trim())) + "</h" + level + ">");
        i++;
        continue;
      }

      // 引用（支持连续多行）
      if (/^>\s?/.test(line)) {
        flushParagraph();
        var quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          quote.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        html.push(
          "<blockquote>" +
            quote
              .map(function (l) {
                return inline(escapeHtml(l));
              })
              .join("<br>") +
            "</blockquote>"
        );
        continue;
      }

      // 有序列表
      if (/^\d+\.\s+/.test(line)) {
        flushParagraph();
        var ol = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
          ol.push(lines[i].replace(/^\d+\.\s+/, ""));
          i++;
        }
        html.push(
          "<ol>" +
            ol
              .map(function (l) {
                return "<li>" + inline(escapeHtml(l)) + "</li>";
              })
              .join("") +
            "</ol>"
        );
        continue;
      }

      // 无序列表
      if (/^[-*+]\s+/.test(line)) {
        flushParagraph();
        var ul = [];
        while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
          ul.push(lines[i].replace(/^[-*+]\s+/, ""));
          i++;
        }
        html.push(
          "<ul>" +
            ul
              .map(function (l) {
                return "<li>" + inline(escapeHtml(l)) + "</li>";
              })
              .join("") +
            "</ul>"
        );
        continue;
      }

      // 空行 = 段落分隔
      if (/^\s*$/.test(line)) {
        flushParagraph();
        i++;
        continue;
      }

      // 普通文本行，攒进当前段落
      para.push(line);
      i++;
    }
    flushParagraph();
    return html.join("\n");
  }

  global.marked = { parse: parse };
})(typeof window !== "undefined" ? window : this);
