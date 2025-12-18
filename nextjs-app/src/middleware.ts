import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from '@/lib/i18n/types';

// 检测用户语言偏好
function detectLocale(request: NextRequest): Locale {
  // 1. IP 地理位置检测（优先级最高）
  // 支持 CloudFront、Cloudflare、Vercel
  const country =
    request.headers.get('CloudFront-Viewer-Country') ||
    request.headers.get('CF-IPCountry') ||
    request.headers.get('x-vercel-ip-country');

  // 中国大陆 IP 强制使用中文
  if (country === 'CN') {
    return 'zh';
  }

  // 2. 浏览器语言偏好
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    // 检查是否包含中文
    if (acceptLanguage.includes('zh')) {
      return 'zh';
    }
  }

  // 3. 默认英文
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态资源和 API 路由
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // 静态文件（如 .ico, .png, .svg 等）
  ) {
    return NextResponse.next();
  }

  // 检查路径是否已包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 检测语言并重定向
  const locale = detectLocale(request);

  // 构建新 URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  
  // 保留查询参数
  newUrl.search = request.nextUrl.search;

  return NextResponse.redirect(newUrl);
}

export const config = {
  // 匹配所有路径，排除静态资源
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
