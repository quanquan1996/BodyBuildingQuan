import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';
import { mainNav } from '@/lib/config/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="font-bold text-lg">
              {siteConfig.name}
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              免费在线健身工具平台，提供FFMI计算、健美造型评分等专业工具，
              帮助健身爱好者科学评估训练效果。
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">快速链接</h3>
            <nav className="flex flex-col space-y-2">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.title}
                </Link>
              ))}
              {/* 预留博客链接 */}
              {/* <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                博客
              </Link> */}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">联系我们</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span>📧</span>
                <span>合作/广告：</span>
              </p>
              <a
                href="mailto:quanquanyiyi520@gmail.com"
                className="text-primary hover:underline break-all"
              >
                quanquanyiyi520@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} {siteConfig.name}. 保留所有权利。
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {/* 预留链接位置 */}
              {/* <Link href="/privacy" className="hover:text-foreground transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                使用条款
              </Link> */}
              <span>🏋️ 科学健身，健康生活</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
