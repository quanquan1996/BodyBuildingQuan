import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone", // Docker 部署需要

  // 压缩优化
  compress: true,

  // 图片优化
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 天缓存
    deviceSizes: [640, 750, 828, 1080, 1200],  // 优化设备尺寸
    imageSizes: [16, 32, 48, 64, 96, 128, 256],  // 优化图片尺寸
  },

  // 实验性优化
  experimental: {
    optimizeCss: true, // CSS 优化 - 内联关键 CSS
  },



  async headers() {
    return [
      {
        // 对所有页面路由设置 Vary 头，让 CDN 根据这些头区分缓存
        source: "/:path*",
        headers: [
          {
            key: "Vary",
            value: "RSC, Next-Router-State-Tree, Next-Router-Prefetch",
          },
        ],
      },
      {
        // 静态资源长期缓存
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // 字体缓存
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML 页面缓存 - 启用 stale-while-revalidate
        source: "/:locale(zh|en)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=600",
          },
        ],
      },
      {
        // 工具页面缓存
        source: "/:locale(zh|en)/tools/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
