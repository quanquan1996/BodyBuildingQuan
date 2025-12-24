import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config/site';
import { locales } from '@/lib/i18n/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const tools = [
    'ffmi-calculator',
    'skinfold-calculator',
    'bmr-calculator',
    'heart-rate-calculator',
    'pose-comparator',
    'grecian-calculator',
    'carb-cycling-calculator',
    'fat-loss-diet-calculator',
    'high-carb-diet-calculator',
    'metabolic-damage-test',
    'muscle-anatomy',
  ];

  const urls: MetadataRoute.Sitemap = [];

  // 为每个语言版本生成 URL
  for (const locale of locales) {
    // 首页
    urls.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          zh: `${baseUrl}/zh`,
          en: `${baseUrl}/en`,
        },
      },
    });

    // 工具页面
    for (const tool of tools) {
      urls.push({
        url: `${baseUrl}/${locale}/tools/${tool}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            zh: `${baseUrl}/zh/tools/${tool}`,
            en: `${baseUrl}/en/tools/${tool}`,
          },
        },
      });
    }
  }

  return urls;
}
