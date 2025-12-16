export function UseCases() {
  const useCases = [
    {
      category: '健身新手',
      keywords: ['健身入门', '新手健身计划', '健身基础知识', '如何开始健身'],
      description: '了解自己的身体数据，制定科学的入门计划',
    },
    {
      category: '增肌人群',
      keywords: ['增肌计划', '肌肉增长', '蛋白质摄入', 'FFMI评估', '瘦体重'],
      description: '追踪肌肉量变化，评估增肌效果',
    },
    {
      category: '减脂人群',
      keywords: ['减脂计划', '体脂率计算', '减肥方法', '热量消耗', '有氧运动'],
      description: '监控体脂变化，科学减脂不反弹',
    },
    {
      category: '健美爱好者',
      keywords: ['健美造型', '古典健美', '传统健美', '健体比赛', '造型练习'],
      description: 'AI评分系统帮助优化比赛造型',
    },
    {
      category: '私人教练',
      keywords: ['私教工具', '会员管理', '训练评估', '身体成分分析'],
      description: '为学员提供专业的数据分析报告',
    },
    {
      category: '运动员',
      keywords: ['运动表现', '体能评估', '竞技状态', '训练监控'],
      description: '量化训练效果，优化竞技状态',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-center mb-3 md:text-3xl">
          适用人群与场景
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          无论你是健身新手还是专业运动员，我们的工具都能帮助你更好地了解自己的身体
        </p>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <div
              key={useCase.category}
              className="bg-background rounded-lg p-5 shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-2">{useCase.category}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {useCase.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {useCase.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Keywords for SEO */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">热门搜索</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {[
              'FFMI计算器',
              '体脂率计算',
              '肌肉量评估',
              '健美造型评分',
              '瘦体重计算',
              'BMI计算',
              '基础代谢计算',
              '每日热量需求',
              '蛋白质摄入量',
              '健身计划生成',
              '增肌食谱',
              '减脂方案',
            ].map((keyword) => (
              <span
                key={keyword}
                className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
