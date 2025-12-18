// Fat Loss Diet Calculator - English

import type { FatLossDietCalculatorDict } from '../zh/fat-loss-diet';

export const fatLossDietCalculator: FatLossDietCalculatorDict = {
  title: 'Fat Loss Diet Calculator',
  description: 'Carb tapering strategy for sustainable fat loss',
  metaDescription:
    'Free fat loss diet calculator. Get personalized calorie and macronutrient plans through progressive carb reduction for sustainable fat loss.',
  form: {
    weight: 'Weight',
    bodyFat: 'Body Fat',
    activityLevel: 'Activity Level',
    phase: 'Diet Phase',
    calculate: 'Calculate Plan',
    phases: {
      week1_2: 'Week 1-2',
      week3_4: 'Week 3-4',
      week5_6: 'Week 5-6',
      week7_8: 'Week 7-8',
    },
  },
  result: {
    title: 'Results',
    calories: 'Daily Calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    deficit: 'Calorie Deficit',
  },
  explanation: {
    title: 'What is Carb Tapering?',
    intro:
      'Carb tapering is a scientific progressive fat loss strategy. Unlike traditional fixed-calorie diets, it gradually reduces carbohydrate intake week by week, allowing the body to smoothly transition into fat-burning mode while maintaining high protein intake to protect muscle.',
    advantages: {
      title: 'Advantages',
      items: [
        'Avoid metabolic adaptation and plateaus',
        'Reduce hunger and binge eating risk',
        'Protect muscle mass',
        'Low psychological burden, easy to maintain',
        'Suitable for general population',
      ],
    },
    warnings: {
      title: 'Notes',
      items: [
        'Not suitable for very low body fat individuals',
        'Should be combined with strength training',
        'Monitor weight changes weekly',
        'Adjust promptly if discomfort occurs',
        'Fat loss cycles should not be too long',
      ],
    },
    reasons: {
      title: 'Why Choose Carb Tapering?',
      items: [
        {
          number: '1',
          title: 'Avoid Metabolic Adaptation',
          description:
            'Sudden large calorie reduction causes metabolic slowdown, gradual reduction gives body time to adapt',
        },
        {
          number: '2',
          title: 'Protect Muscle',
          description:
            'High protein intake combined with gradual carb reduction maximizes muscle retention',
        },
        {
          number: '3',
          title: 'Stabilize Blood Sugar',
          description:
            'Gradually reducing carbs helps stabilize blood sugar, reducing hunger and mood swings',
        },
        {
          number: '4',
          title: 'Easy to Execute',
          description:
            'Only small weekly adjustments needed, easier to maintain than extreme diets',
        },
      ],
    },
    foodSuggestions: {
      title: 'Food Suggestions',
      categories: [
        { name: 'Protein Sources', foods: 'Chicken breast, beef, fish, shrimp, eggs, tofu, protein powder' },
        { name: 'Quality Carbs', foods: 'Brown rice, oats, sweet potato, whole wheat bread, quinoa' },
        { name: 'Healthy Fats', foods: 'Nuts, avocado, olive oil, fatty fish' },
      ],
    },
  },
  reference: {
    title: 'Carb Tapering Reference',
    principle: {
      title: 'Carb Tapering Principle',
      description:
        'Carb tapering is a progressive fat loss strategy that gradually reduces carbohydrate intake week by week, allowing the body to adapt to low-carb state and avoid metabolic adaptation and plateaus.',
    },
    strategy: {
      title: 'Calculator Strategy',
      initialCarb: { label: 'Initial Carb Ratio', value: '45%' },
      weeklyReduction: { label: 'Weekly Reduction', value: '8%' },
      minCarb: { label: 'Minimum Carb Ratio', value: '20%' },
      protein: { label: 'Protein', value: '2.0g/kg body weight' },
      minFat: { label: 'Minimum Fat', value: '0.8g/kg body weight' },
    },
    deficitStrategy: {
      title: 'Calorie Deficit Strategy',
      week1: { label: 'Week 1', value: '-300 kcal' },
      weeklyIncrease: { label: 'Weekly Increase', value: '+50 kcal' },
      maxDeficit: { label: 'Max Deficit', value: '-600 kcal' },
    },
    suitableFor: {
      title: '💡 Who Is It For',
      description:
        'This plan is suitable for general fitness enthusiasts and fat loss beginners. If you are a professional athlete or have special health conditions, consult a professional nutritionist.',
    },
  },
};
