# 🍵 清茶小馆

我的个人博客，托管在 GitHub Pages：<https://mikey5616.github.io>

## 目录结构

| 路径 | 说明 |
| --- | --- |
| `index.html` | 首页（文章列表） |
| `post.html` | 统一的文章页面（通过 `?p=文件名` 加载文章） |
| `css/style.css` | 全部样式 |
| `js/posts.js` | **文章索引**（发新文章要在这里加一条记录） |
| `js/main.js` | 首页文章列表渲染（一般不用改） |
| `js/markdown.js` | 轻量 Markdown 渲染器（一般不用改） |
| `js/render.js` | 文章页渲染逻辑（一般不用改） |
| `posts/` | 所有文章，一篇一个 `.md` 文件（Markdown 格式） |
| `serve.js` / `serve.bat` | 本地预览服务器 |

## 如何发布一篇新文章（用 Markdown 写）

1. 在 `posts/` 目录新建一个 `.md` 文件，英文短横线命名，如 `posts/a-rainy-day.md`
2. 用 Markdown 语法写正文（**只写正文**，标题和日期写在索引里；正文里的大标题用 `##` 开头）
3. 编辑 `js/posts.js`，在 `POSTS` 数组里加一条记录：

   ```js
   {
     slug: "a-rainy-day",             // 文件名（不含 .md）
     title: "一个下雨的下午",          // 显示在页面上的大标题
     date: "2026-10-08",              // 日期，格式 YYYY-MM-DD
     excerpt: "雨声是最好的背景音。",   // 首页列表显示的摘要
     tags: ["随笔"]
   }
   ```

4. 本地预览：双击 `serve.bat`，浏览器打开 <http://localhost:8765>
5. 提交推送：

   ```bash
   git add .
   git commit -m "新文章：一个下雨的下午"
   git push
   ```

   约一分钟后刷新 <https://mikey5616.github.io> 即可看到。

## Markdown 速查表

| 写法 | 效果 |
| --- | --- |
| `## 小标题` | 二级标题（`#` 到 `####` 依次变小） |
| 空行分隔的普通文字 | 段落 |
| `**加粗**` | **加粗** |
| `*斜体*` | *斜体* |
| `` `代码` `` | 行内代码 |
| `[链接文字](https://...)` | 链接 |
| `![描述](images/xx.jpg)` | 图片（图片文件放 `posts/images/` 下） |
| `- 项目` | 无序列表 |
| `1. 项目` | 有序列表 |
| `> 引用` | 引用块 |
| `---`（单独一行） | 分割线 |
| 上下各一行 \`\`\` | 代码块 |

## 本地预览

双击 `serve.bat`（需要电脑装有 Node.js），然后用浏览器打开 <http://localhost:8765>，效果和线上完全一致。

> 小提示：单独双击 `index.html` 也能看首页，但文章页需要加载 `.md` 文件，必须用这个服务器预览。

## 评论系统

每篇文章底部有 Giscus 评论区（基于 GitHub Discussions），访客登录 GitHub 账号即可留言，评论数据保存在本仓库的 Discussions 里。

## 修改网站样式

所有颜色、字体、间距都在 `css/style.css` 顶部的 `:root` 变量里，改一处全站生效。
