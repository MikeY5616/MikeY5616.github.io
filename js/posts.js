// ============================================
// 文章索引 —— 每发一篇新文章，在这里加一条记录
//
// 字段说明：
//   slug    - 文章文件名（不含 .html，文件放在 posts/ 目录下）
//   title   - 文章标题（显示在首页列表）
//   date    - 发布日期，格式 YYYY-MM-DD（按它排序，新的在前）
//   excerpt - 摘要，显示在首页列表里，一两句话即可
//   tags    - 标签（可选，可以留空数组）
// ============================================

const POSTS = [
  {
    slug: "bitwarden-story",
    title: "Bitwarden：一个开源密码管理器的十年",
    date: "2026-10-07",
    excerpt: "把密码托付给开源：Bitwarden 的起源、安全设计，和一个程序员副业长成独立小巨头的十年。",
    tags: ["工具", "随笔"]
  },
  {
    slug: "qingjian-input-method",
    title: "青简输入法",
    date: "2026-10-07",
    excerpt: "今天发现一个好玩的输入法：打字的同时顺便学外语，无痛积累词汇。",
    tags: ["随笔", "工具"]
  },
  {
    slug: "markdown-usage",
    title: "markdown使用指南",
    date: "2026-10-06",
    excerpt: "自己按照官方指南精简而成的 Markdown 速查笔记。",
    tags: ["随笔"]
  },
  {
    slug: "china-next-decade",
    title: "中美博弈下，一个投资人关于未来十年的思考",
    date: "2026-10-05",
    excerpt: "从国际秩序、文化内核、代际转变三个维度，理解中国未来十年的结构性机遇。",
    tags: ["投资", "随笔"]
  },
  {
    slug: "hello-world",
    title: "开站啦：你好，世界",
    date: "2026-10-05",
    excerpt: "这是我的个人博客的第一篇文章。欢迎来坐坐，喝喝茶。",
    tags: ["随笔", "开站"]
  }
];
