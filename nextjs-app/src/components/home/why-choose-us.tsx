import type { Dictionary } from '@/lib/i18n/types';

interface WhyChooseUsProps {
  dict: Dictionary;
}

export function WhyChooseUs({ dict }: WhyChooseUsProps) {
  const reasons = [
    {
      icon: '🆓',
      title: dict.whyChooseUs.free.title,
      description: dict.whyChooseUs.free.description,
      gradient: 'linear-gradient(135deg, #4CAF50, #81C784)',
    },
    {
      icon: '🤖',
      title: dict.whyChooseUs.ai.title,
      description: dict.whyChooseUs.ai.description,
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
    },
    {
      icon: '📊',
      title: dict.whyChooseUs.scientific.title,
      description: dict.whyChooseUs.scientific.description,
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
    },
    {
      icon: '🔒',
      title: dict.whyChooseUs.privacy.title,
      description: dict.whyChooseUs.privacy.description,
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    },
  ];

  return (
    <section
      className="py-12 md:py-16"
      style={{ background: 'linear-gradient(180deg, #F0FFF4 0%, #F5F7FA 100%)' }}
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tighter text-center mb-2 md:text-3xl">
          {dict.home.whyTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">
          {dict.home.whySubtitle}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-white rounded-2xl p-4 transition-all hover:shadow-md"
              style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: reason.gradient,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
              >
                <span className="text-xl filter drop-shadow-sm">{reason.icon}</span>
              </div>
              <h3 className="font-semibold text-sm mb-1" style={{ color: '#333' }}>
                {reason.title}
              </h3>
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
