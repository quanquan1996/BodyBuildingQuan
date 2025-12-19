---
layout: home
title: Home
---

# 🏋️ Muscle Tool Tech Blog

欢迎来到 Muscle Tool 技术博客！这里分享健身工具开发相关的技术文章。

Welcome to the Muscle Tool Tech Blog! Here we share technical articles about fitness tool development.

---

## 🔗 Quick Links

- 🌐 [Muscle Tool 在线工具站](https://muscletool.pro)
- 📦 [GitHub 仓库](https://github.com/quanquan1996/BodyBuildingQuan)

---

## 📝 Latest Posts

{% for post in site.posts limit:10 %}
### [{{ post.title }}]({{ post.url | relative_url }})
<small>{{ post.date | date: "%Y-%m-%d" }} · {{ post.categories | join: ", " }}</small>

{{ post.excerpt | strip_html | truncate: 200 }}

---
{% endfor %}
