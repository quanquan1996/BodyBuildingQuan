const reasons = [
  {
    icon: '🆓',
    title: '完全免费',
    description: '永久免费，无需注册付费',
    gradient: 'linear-gradient(135deg, #4CAF50, #81C784)',
  },
  {
    icon: '🤖',
    title: 'AI驱动',
    description: '先进AI技术，精准分析',
    gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  {
    icon: '📊',
    title: '科学专业',
    description: '基于运动科学研究',
    gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
  },
  {
    icon: '🔒',
    title: '隐私安全',
    description: '数据本地处理，不上传',
    gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
  },
];

export function WhyChooseUs() {
  return (
    <section 
      className="py-12 md:py-16"
      style={{ background: 'linear-gradient(180deg, #F0FFF4 0%, #F5F7FA 100%)' }}
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-center mb-2 md:text-3xl">
          为什么选择我们？
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          专业、免费、安全的健身数据分析平台
        </p>
        
        {/* 移动端2x2，PC端1x4 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto">
          {reasons.map((reason) => (
            <div 
              key={reason.title} 
              className="bg-white rounded-2xl p-4 transition-all hover:shadow-md"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
            >
              {/* 彩色底图标 */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ 
                  background: reason.gradient,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                <span className="text-xl filter drop-shadow-sm">{reason.icon}</span>
              </div>
              
              {/* 标题 */}
              <h3 className="font-semibold text-sm mb-1" style={{ color: '#333' }}>
                {reason.title}
              </h3>
              
              {/* 简短描述 */}
              <p className="text-xs leading-relaxed" style={{ color: '#666' }}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
