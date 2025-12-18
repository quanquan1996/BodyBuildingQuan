// Carb Cycling Calculator - English

import type { CarbCyclingCalculatorDict } from '../zh/carb-cycling';

export const carbCyclingCalculator: CarbCyclingCalculatorDict = {
  title: 'Carb Cycling Calculator',
  description: 'Plan carb cycling diet based on Katch-McArdle formula',
  metaDescription:
    'Free carb cycling calculator. Plan high, low, and no carb days for effective fat loss while maintaining muscle.',
  form: {
    weight: 'Weight',
    bodyFat: 'Body Fat',
    activityLevel: 'Activity Level',
    goal: 'Goal',
    calculate: 'Calculate Plan',
    goals: {
      fatLoss: 'Fat Loss',
      maintain: 'Maintain',
      muscle: 'Muscle Gain',
    },
  },
  result: {
    title: 'Results',
    highCarb: 'High Carb Day',
    lowCarb: 'Low Carb Day',
    noCarb: 'No Carb Day',
    protein: 'Protein',
    fat: 'Fat',
    carbs: 'Carbs',
    calories: 'Calories',
  },
  explanation: {
    title: 'Carb Cycling Principles',
    whatIs: {
      title: 'What is Carb Cycling?',
      content:
        'Carb Cycling is a dietary strategy that alternates between high, medium, and low carbohydrate intake on different days to optimize energy utilization and hormone levels. High carb days replenish glycogen and boost training performance, while low carb days promote fat burning. Combined, they allow fat loss while maintaining muscle and training capacity.',
    },
    formula: {
      title: 'Katch-McArdle Formula',
      description:
        'This calculator uses the Katch-McArdle formula to calculate basal metabolic rate, which is based on lean body mass and is more accurate for fitness enthusiasts with known body fat percentage.',
      bmr: 'BMR = 370 + (21.6 × Lean Mass)',
      leanMass: 'Lean Mass = Weight × (1 - Body Fat%/100)',
    },
    benefits: {
      title: 'Benefits of Carb Cycling',
      items: [
        'Avoid metabolic adaptation and plateaus from long-term low carb',
        'High carb days replenish glycogen, maintain training intensity',
        'Low carb days promote fat oxidation, improve fat loss efficiency',
        'Psychologically easier to maintain with "relaxed days"',
        'Maintain stable leptin and thyroid hormone levels',
      ],
    },
    suitableFor: {
      title: 'Who Is It For',
      content:
        'Carb cycling is suitable for those with fitness experience who want to maintain training performance during fat loss. If you are a fitness beginner, start with simple calorie control first, then try carb cycling once familiar.',
    },
    warnings: {
      title: 'Notes',
      items: [
        'Results are for reference only, actual needs vary by individual',
        'Adjust based on weight changes and training feedback',
        'Consult a professional nutritionist if you have health concerns',
      ],
    },
  },
  reference: {
    title: 'Carb Cycling Guide',
    simplePlan: {
      title: 'Simple Weekly Plan (2 High, 5 Low)',
      highCarb: '🟢 High Carb Day',
      highCarbDays: 'Wednesday, Saturday',
      lowCarb: '🟠 Low Carb Day',
      lowCarbDays: 'Mon, Tue, Thu, Fri, Sun',
    },
    advancedPlan: {
      title: 'Advanced Weekly Plan (2 High, 2 Medium, 3 Low)',
      highCarb: '🟢 High Carb Day',
      highCarbDays: 'Wednesday, Saturday',
      mediumCarb: '🔵 Medium Carb Day',
      mediumCarbDays: 'Monday, Friday',
      lowCarb: '🟠 Low Carb Day',
      lowCarbDays: 'Tue, Thu, Sun',
    },
    trainingTips: {
      title: 'Training Schedule Tips',
      highCarb: {
        title: '🟢 High Carb Day',
        description: 'Schedule large muscle group training (legs, back, chest), high intensity',
      },
      mediumCarb: {
        title: '🔵 Medium Carb Day',
        description: 'Schedule small muscle group training (shoulders, arms), moderate intensity',
      },
      lowCarb: {
        title: '🟠 Low Carb Day',
        description: 'Rest day or low intensity cardio like walking, yoga',
      },
    },
    executionTips: {
      title: '💡 Execution Tips',
      items: [
        'Choose complex carbs on high carb days (oats, brown rice, sweet potato)',
        'Increase vegetable intake on low carb days for satiety',
        'Keep protein stable daily, spread across meals',
        'Adjust flexibly based on training feedback, no need to be strict',
      ],
    },
  },
};
