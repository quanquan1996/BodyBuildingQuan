# 性能优化记录

## 优化日期：2024-12-17

### SEO 优化

1. **修复 OG 图片缺失**
   - 创建 `public/og.svg` 占位图片（1200x630）
   - 建议后续替换为真实的 JPG/PNG 图片

2. **修复首页 metadata**
   - 添加 openGraph 配置
   - 移除无效的 SearchAction（网站无搜索功能）
   - 移除空的 sameAs 数组

3. **移除虚假 aggregateRating**
   - 清理所有工具页面的虚假评分数据
   - 避免 Google 因虚假数据惩罚

### 依赖优化

1. **移除未使用的依赖**
   - `html2canvas` - 未被使用
   - `tw-animate-css` - 未被使用

### Next.js 配置优化

```typescript
// next.config.ts 新增配置
compress: true,                    // Gzip 压缩
experimental: { optimizeCss: true }, // CSS 优化
images: {
  formats: ["image/avif", "image/webp"],
  minimumCacheTTL: 60 * 60 * 24 * 30,
},
// 静态资源长期缓存头
```

### CSS 优化

1. **精简 globals.css**
   - 移除未使用的 dark 模式变量
   - 移除未使用的 sidebar 变量
   - 移除 tw-animate-css 导入
   - 从 ~200 行精简到 ~100 行

### 构建产物大小

| 类型 | 大小（未压缩） | Gzip 后预估 |
|------|---------------|-------------|
| JS 总计 | ~1,163 KB | ~350 KB |
| CSS 总计 | ~430 KB | ~60 KB |
| 静态资源总计 | ~6.1 MB | ~1.5 MB |

### 预估加载时间

| 网络类型 | 首次加载 | 后续加载（缓存） |
|----------|----------|------------------|
| 4G (10 Mbps) | ~1.2-1.5s | <0.3s |
| 3G (1.5 Mbps) | ~3-4s | <0.5s |
| WiFi (50 Mbps) | <0.3s | <0.1s |

### 后续优化建议

1. **OG 图片** - 将 SVG 替换为优化后的 JPG/PNG
2. **代码分割** - 对 pose-comparator 使用 `next/dynamic`
3. **字体子集化** - 对 Noto Sans SC 进行中文子集化
