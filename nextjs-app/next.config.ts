import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone", // Docker 部署需要
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
    ];
  },
};

export default nextConfig;
