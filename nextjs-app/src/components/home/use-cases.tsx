import type { Dictionary } from '@/lib/i18n/types';

interface UseCasesProps {
  dict: Dictionary;
}

export function UseCases({ dict }: UseCasesProps) {
  const useCases = [
    {
      category: dict.useCases.beginner.title,
      emoji: '🌱',
      keywords: dict.useCases.beginner.keywords,
      description: dict.useCases.beginner.description,
      color: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        tag: 'bg-emerald-100 text-emerald-700',
        emoji: 'bg-emerald-100',
      },
    },
    {
      category: dict.useCases.muscle.title,
      emoji: '💪',
      keywords: dict.useCases.muscle.keywords,
      description: dict.useCases.muscle.description,
      color: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        tag: 'bg-blue-100 text-blue-700',
        emoji: 'bg-blue-100',
      },
    },
    {
      category: dict.useCases.fatLoss.title,
      emoji: '🔥',
      keywords: dict.useCases.fatLoss.keywords,
      description: dict.useCases.fatLoss.description,
      color: {
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        tag: 'bg-orange-100 text-orange-700',
        emoji: 'bg-orange-100',
      },
    },
    {
      category: dict.useCases.bodybuilding.title,
      emoji: '🏆',
      keywords: dict.useCases.bodybuilding.keywords,
      description: dict.useCases.bodybuilding.description,
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
          {dict.home.useCasesTitle}
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
          {dict.home.useCasesSubtitle}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {useCases.map((useCase) => (
            <div
              key={useCase.category}
              className={`${useCase.color.bg} ${useCase.color.border} border rounded-2xl p-5 transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              <div className="flex gap-4">
                <div
                  className={`${useCase.color.emoji} w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-3xl">{useCase.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base mb-1" style={{ color: '#333' }}>
                    {useCase.category}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: '#666' }}>
                    {useCase.description}
                  </p>
                </div>
              </div>
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
