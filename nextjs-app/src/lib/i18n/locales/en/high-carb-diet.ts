// High Carb Diet Calculator - English

import type { HighCarbDietCalculatorDict } from '../zh/high-carb-diet';

export const highCarbDietCalculator: HighCarbDietCalculatorDict = {
  title: 'High Carb Fat Loss Calculator',
  description: 'High carb low fat strategy for high-volume trainers',
  metaDescription:
    'Free high carb diet calculator. Optimize macronutrient ratios for fat loss while maintaining high training performance.',
  form: {
    weight: 'Weight',
    bodyFat: 'Body Fat',
    activityLevel: 'Activity Level',
    trainingDays: 'Training Days/Week',
    calculate: 'Calculate Plan',
  },
  result: {
    title: 'Results',
    trainingDay: 'Training Day',
    restDay: 'Rest Day',
    calories: 'Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
  },
  explanation: {
    title: 'FAQ',
    faq: [
      {
        question: 'Is high carb or low carb better for fat loss?',
        answer:
          "Neither is absolutely better, it depends on individual circumstances. High carb is suitable for high-volume trainers who like carbs and have faster metabolism; low carb suits sedentary people with poor insulin sensitivity. The most important thing is choosing a plan you can maintain long-term.",
      },
      {
        question: 'Why set a fat minimum?',
        answer:
          'Fat is an essential nutrient involved in hormone synthesis, cell membrane construction, and fat-soluble vitamin absorption. Men need at least 30g and women need at least 35g of fat daily to maintain normal physiological function.',
      },
      {
        question: 'Can I eat anything on refeed days?',
        answer:
          "No. The purpose of refeed days is to restore hormone levels, not binge eating. Choose clean carb sources, moderately increase fat intake, but still control total calories around TDEE.",
      },
      {
        question: 'When do I need refeed days?',
        answer:
          'When body fat is low (men <12%, women <20%) or dieting for extended periods (over 8 weeks), schedule 1 refeed day per week. Higher body fat individuals can do every 2 weeks or skip temporarily.',
      },
      {
        question: 'Will high carb fat loss cause muscle loss?',
        answer:
          "As long as protein intake is sufficient (2.0-2.2g/kg) and strength training is maintained, high carb fat loss won't cause more muscle loss than other approaches. Adequate carbs actually ensure training intensity, helping preserve muscle.",
      },
      {
        question: 'How to choose high carb low fat foods?',
        answer:
          'Prioritize natural, unprocessed carb sources: rice, potatoes, sweet potatoes, oats, fruits. Avoid high-fat carb combinations like chips, cakes, fried foods. Choose lean meats, fish, egg whites for protein.',
      },
    ],
  },
  reference: {
    title: 'High Carb Fat Loss Principles',
    whatIs: {
      title: 'What is High Carb Fat Loss?',
      description:
        'High Carb Fat Loss is a diet strategy characterized by high carbohydrates and low fat. Unlike traditional low-carb diets, it maintains higher carb intake to preserve metabolic rate and training performance.',
    },
    science: {
      title: 'Scientific Principles',
      tef: {
        title: '🔥 Thermic Effect of Food (TEF)',
        items: [
          'Protein: 20-30% calories used for digestion',
          'Carbohydrates: 5-10% calories used for digestion',
          'Fat: 0-3% calories used for digestion',
        ],
      },
      leptin: {
        title: '💪 Maintain Leptin Levels',
        description:
          'Carbohydrates help maintain leptin levels, avoiding fat loss plateaus caused by metabolic adaptation.',
      },
      performance: {
        title: '⚡ Training Performance',
        description:
          'Adequate glycogen stores ensure energy supply for high-intensity training, preventing muscle loss.',
      },
    },
    dayTypes: {
      title: 'Three Day Types',
      training: {
        title: '🏋️ Training Day (High Carb Low Fat)',
        items: [
          'Protein: 2.2g/kg body weight',
          'Fat: 0.5g/kg (minimum 30-35g)',
          'Carbs: Remaining calories, ~50-60%',
        ],
      },
      rest: {
        title: '😴 Rest Day (Medium Carb Low Fat)',
        items: ['Protein: Keep unchanged', 'Fat: Slightly increase to 0.6g/kg', 'Carbs: Reduce 30%'],
      },
      refeed: {
        title: '🍕 Refeed Day (High Carb Medium Fat)',
        items: [
          'Calories: Maintain TDEE, no deficit',
          'Fat: Increase to 1.0g/kg',
          'Carbs: Increase 20%',
          'Purpose: Restore hormones, break plateau',
        ],
      },
    },
    suitableFor: {
      title: 'Who Is It For',
      items: ['✓ High training volume', '✓ Carb lovers', '✓ Strength trainers', '✓ Fast metabolism'],
    },
    warnings: {
      title: '⚠️ Notes',
      items: [
        'Fat cannot be too low, ensure essential fatty acid intake',
        'Choose low-fat high-carb foods, avoid high-fat carb combinations',
        'Higher body fat individuals should use standard fat loss plan first',
        'Weigh 1-2 times per week, adjust based on changes',
      ],
    },
  },
};
