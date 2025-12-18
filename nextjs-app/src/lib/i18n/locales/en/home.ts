// Home page - English

import type { HomeDict, WhyChooseUsDict, UseCasesDict } from '../zh/home';

export const home: HomeDict = {
  heroTitle: 'Muscle Tool - Fitness AI Tools',
  heroDescription: 'Free online fitness tools to scientifically evaluate your training results',
  heroSubtitle: 'FFMI Calculator · Body Fat Analysis · Bodybuilding Pose Scoring · Muscle Mass Assessment',
  ctaButton: 'Get Started',
  secondaryCta: 'Fat Loss Diet Calculator',
  featuresTitle: 'Popular Fitness Tools',
  whyTitle: 'Why Choose Us?',
  whySubtitle: 'Professional, free, and secure fitness data analysis platform',
  useCasesTitle: 'Who Is This For',
  useCasesSubtitle: 'Whether you are a fitness beginner or a professional athlete, our tools can help you better understand your body',
  aboutTitle: 'About Muscle Tool',
  aboutDescription: 'Muscle Tool is a free online fitness calculator platform, providing professional body composition analysis and training evaluation tools for fitness enthusiasts, bodybuilders, and personal trainers. No app download required, just open the webpage to use.',
  aboutGoalTitle: 'Our Goal',
  aboutGoalDescription: 'To provide every fitness enthusiast with professional-grade data analysis tools, using scientific methods to evaluate training results and develop reasonable fitness plans.',
  aboutPhilosophyTitle: 'Core Philosophy',
  aboutPhilosophyDescription: 'Data-driven fitness, science-guided training. Through quantitative indicators to help you understand your body condition, avoid blind training, and improve fitness efficiency.',
  stats: {
    users: '10,000+',
    usersLabel: 'Users',
    tools: '10+',
    toolsLabel: 'Pro Tools',
  },
};

export const whyChooseUs: WhyChooseUsDict = {
  free: { title: 'Completely Free', description: 'Forever free, no registration required' },
  ai: { title: 'AI Powered', description: 'Advanced AI technology for precise analysis' },
  scientific: { title: 'Scientific', description: 'Based on sports science research' },
  privacy: { title: 'Privacy Safe', description: 'Data processed locally, never uploaded' },
};

export const useCases: UseCasesDict = {
  beginner: {
    title: 'Fitness Beginners',
    description: 'Understand your body data and create a scientific starter plan',
    keywords: ['Getting Started', 'Beginner Plan', 'Basics'],
  },
  muscle: {
    title: 'Muscle Building',
    description: 'Track muscle mass changes and evaluate muscle gain progress',
    keywords: ['Muscle Plan', 'FFMI Assessment', 'Protein Intake'],
  },
  fatLoss: {
    title: 'Fat Loss',
    description: 'Monitor body fat changes for sustainable fat loss',
    keywords: ['Body Fat Calculator', 'Calorie Burn', 'Cardio'],
  },
  bodybuilding: {
    title: 'Bodybuilding',
    description: 'AI scoring system helps optimize competition poses',
    keywords: ['Bodybuilding Poses', 'AI Scoring', 'Competition Prep'],
  },
};
