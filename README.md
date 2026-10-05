# 🍵 清茶小馆

我的个人博客，托管在 GitHub Pages：<https://mikey5616.github.io>

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 首页（文章列表） |
| `css/style.css` | 全部样式 |
| `js/posts.js` | **文章索引**（发新文章要在这里加一条记录） |
| `js/main.js` | 首页文章列表渲染（一般不用改） |
| `posts/` | 所有文章，一个文件一篇 |
| `posts/_template.html` | 新文章模板 |

## 如何发布一篇新文章

1. 复制 `posts/_template.html`，改名为英文短横线命名，如 `posts/a-rainy-day.html`
2. 用编辑器打开，修改 `<title>`、日期和正文（正文写在 `post-body` 里面）
3. 编辑 `js/posts.js`，在 `POSTS` 数组里加一条记录：

   ```js
   {
     slug: "a-rainy-day",          // 文件名（不含 .html）
     title: "一个下雨的下午",       // 标题
     date: "2026-10-08",           // 日期，格式 YYYY-MM-DD
     excerpt: "雨声是最好的背景音。", // 首页显示的摘要
     tags: ["随笔"]
   }
   ```

4. 本地双击打开 `index.html` 预览效果
5. 提交推送：

   ```bash
   git add .
   git commit -m "新文章：一个下雨的下午"
   git push
   ```

   大约一分钟后，刷新 <https://mikey5616.github.io> 就能看到新文章了。

## 本地预览

直接用浏览器打开 `index.html` 即可，不需要安装任何工具。

## 修改网站样式

所有颜色、字体、间距都在 `css/style.css` 顶部的 `:root` 变量里，改一处全站生效。
