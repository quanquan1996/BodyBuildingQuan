// 根路径重定向到默认语言版本
// 实际重定向由 middleware.ts 处理
import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n/types';

export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
