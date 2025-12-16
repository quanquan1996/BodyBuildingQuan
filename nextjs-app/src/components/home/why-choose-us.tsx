import { Card, CardContent } from '@/components/ui/card';

const reasons = [
  {
    icon: '🆓',
    title: '完全免费',
    description: '所有工具永久免费使用，无需注册，无需付费',
  },
  {
    icon: '🌐',
    title: '在线使用',
    description: '无需下载APP，打开网页即可使用，支持手机和电脑',
  },
  {
    icon: '🤖',
    title: 'AI驱动',
    description: '采用先进的AI技术，提供精准的数据分析和评估',
  },
  {
    icon: '📊',
    title: '科学专业',
    description: '基于运动科学研究，提供专业级的健身数据分析',
  },
  {
    icon: '🔒',
    title: '隐私安全',
    description: '数据本地处理，不上传服务器，保护你的隐私',
  },
  {
    icon: '📱',
    title: '移动优先',
    description: '专为手机优化，随时随地记录和分析健身数据',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-center mb-8 md:text-3xl">
          为什么选择健身AI工具站？
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <Card key={reason.title} className="border-0 shadow-sm bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{reason.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-1">{reason.title}</h3>
                    <p className="text-sm text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
