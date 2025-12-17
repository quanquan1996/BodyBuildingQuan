export function UseCases() {
  const useCases = [
    {
      category: '健身新手',
      emoji: '🌱',
      keywords: ['健身入门', '新手计划', '基础知识'],
      description: '了解自己的身体数据，制定科学的入门计划',
      color: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        tag: 'bg-emerald-100 text-emerald-700',
        emoji: 'bg-emerald-100',
      },
    },
    {
      category: '增肌人群',
      emoji: '💪',
      keywords: ['增肌计划', 'FFMI评估', '蛋白质摄入'],
      description: '追踪肌肉量变化，评估增肌效果',
      color: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        tag: 'bg-blue-100 text-blue-700',
        emoji: 'bg-blue-100',
      },
    },
    {
      category: '减脂人群',
      emoji: '🔥',
      keywords: ['体脂率计算', '热量消耗', '有氧运动'],
      description: '监控体脂变化，科学减脂不反弹',
      color: {
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        tag: 'bg-orange-100 text-orange-700',
        emoji: 'bg-orange-100',
      },
    },
    {
      category: '健美爱好者',
      emoji: '🏆',
      keywords: ['健美造型', 'AI评分', '比赛准备'],
      description: 'AI评分系统帮助优化比赛造型',
      color: {
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        tag: 'bg-purple-100 text-purple-700',
        emoji: 'bg-purple-100',
      },
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
        
        <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {useCases.map((useCase) => (
            <div
              key={useCase.category}
              className={`${useCase.color.bg} ${useCase.color.border} border rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              {/* 左图右文布局 */}
              <div className="flex gap-4">
                {/* 左侧 Emoji */}
                <div 
                  className={`${useCase.color.emoji} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-3xl">{useCase.emoji}</span>
                </div>
                
                {/* 右侧内容 */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1" style={{ color: '#333' }}>
                    {useCase.category}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: '#666' }}>
                    {useCase.description}
                  </p>
                </div>
              </div>
              
              {/* 底部标签 */}
              <div className="flex flex-wrap gap-1.5 mt-3 pl-[72px]">
                {useCase.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className={`${useCase.color.tag} inline-block px-2.5 py-0.5 text-xs rounded-full font-medium`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
