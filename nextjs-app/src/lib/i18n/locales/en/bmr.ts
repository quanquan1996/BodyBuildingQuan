// BMR Calculator - English

import type { BMRCalculatorDict } from '../zh/bmr';

export const bmrCalculator: BMRCalculatorDict = {
  title: 'BMR Calculator',
  description:
    'Calculate daily Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE)',
  metaDescription:
    'Free BMR and TDEE calculator. Calculate your daily calorie needs based on age, height, weight, and activity level.',
  form: {
    basicInfo: 'Basic Information',
    age: 'Age',
    height: 'Height',
    weight: 'Weight',
    gender: 'Gender',
    activityLevel: 'Activity Level',
    bodyFat: 'Body Fat',
    bodyFatOptional: 'Optional, for more accurate calculation',
    calculate: 'Calculate BMR',
    activityLevels: {
      sedentary: 'Sedentary (little or no exercise)',
      light: 'Light (exercise 1-3 days/week)',
      moderate: 'Moderate (exercise 3-5 days/week)',
      active: 'Active (exercise 6-7 days/week)',
      veryActive: 'Very Active (hard exercise daily)',
    },
  },
  result: {
    title: 'Results',
    bmr: 'Basal Metabolic Rate',
    tdee: 'Total Daily Energy Expenditure',
    protein: 'Protein',
    macros: 'Macronutrients',
  },
  explanation: {
    title: 'What is Basal Metabolic Rate (BMR)?',
    whatIs: 'BMR Definition',
    whatIsContent:
      'Basal Metabolic Rate (BMR) is the minimum energy expenditure required to maintain life in a completely resting state. This includes energy needed for basic physiological functions such as breathing, blood circulation, cell growth, and temperature regulation.',
    mifflinFormula: {
      title: 'Mifflin-St Jeor Formula',
      male: 'Male:',
      maleFormula: 'BMR = 10×weight(kg) + 6.25×height(cm) - 5×age + 5',
      female: 'Female:',
      femaleFormula: 'BMR = 10×weight(kg) + 6.25×height(cm) - 5×age - 161',
    },
    tdee: {
      title: 'TDEE Calculation',
      description: 'Total Daily Energy Expenditure (TDEE) = BMR × Activity Factor',
      levels: [
        'Sedentary: ×1.2',
        'Light activity: ×1.375',
        'Moderate activity: ×1.55',
        'Active: ×1.725',
        'Very active: ×1.9',
      ],
    },
    factors: {
      title: 'Factors Affecting BMR',
      items: [
        { name: 'Age', description: 'BMR gradually decreases with age' },
        { name: 'Gender', description: 'Males typically have higher BMR than females' },
        { name: 'Muscle Mass', description: 'More muscle means higher BMR' },
        { name: 'Weight', description: 'Higher weight usually means higher BMR' },
      ],
    },
    tips: {
      title: 'Practical Tips',
      items: [
        'For fat loss, aim for 300-500 kcal below TDEE daily',
        'For muscle gain, aim for 200-300 kcal above TDEE daily',
        'Avoid eating below BMR to prevent metabolic slowdown',
        'Building muscle can increase BMR, helping long-term weight management',
      ],
    },
  },
  reference: {
    title: 'BMR Reference Ranges',
    maleTitle: 'Male BMR Reference',
    femaleTitle: 'Female BMR Reference',
    ageRanges: {
      young: '18-30 years',
      middle: '31-50 years',
      senior: '51+ years',
    },
    maleValues: {
      young: '1600-1800 kcal',
      middle: '1500-1700 kcal',
      senior: '1400-1600 kcal',
    },
    femaleValues: {
      young: '1300-1500 kcal',
      middle: '1200-1400 kcal',
      senior: '1100-1300 kcal',
    },
    tip: {
      title: '💡 Tip',
      description:
        'These are general reference ranges. Actual BMR varies based on individual factors (height, weight, muscle mass, etc.).',
    },
  },
};
