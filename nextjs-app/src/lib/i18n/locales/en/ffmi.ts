// FFMI Calculator - English

import type { FFMICalculatorDict } from '../zh/ffmi';

export const ffmiCalculator: FFMICalculatorDict = {
  title: 'FFMI Calculator',
  description: 'Calculate your Fat-Free Mass Index to evaluate muscle development',
  metaDescription: 'Free FFMI calculator. Enter height, weight, and body fat percentage to quickly calculate your Fat-Free Mass Index and evaluate muscle development.',
  form: {
    basicInfo: 'Basic Information',
    height: 'Height',
    weight: 'Weight',
    bodyFat: 'Body Fat',
    bodyFatHint: "Don't know your body fat? Use skinfold measurement",
    gender: 'Gender',
    calculate: 'Calculate FFMI',
  },
  result: {
    title: 'Results',
    adjustedFfmi: 'Adjusted FFMI',
    ffmiRaw: 'Raw FFMI',
    leanMass: 'Lean Mass',
    fatMass: 'Fat Mass',
    muscleMass: 'Est. Muscle Mass',
    bodyComposition: 'Body Composition',
    leanMassHelp: 'Weight minus fat, includes muscle, bones, organs',
    muscleHelp: 'Approximately 85% of lean mass is skeletal muscle',
  },
  categories: {
    below_average: 'Below Average',
    average: 'Average',
    above_average: 'Above Average',
    excellent: 'Excellent',
    elite: 'Elite',
  },
  explanation: {
    title: 'FFMI Principles & Significance',
    whatIs: 'What is FFMI?',
    whatIsContent: 'FFMI (Fat-Free Mass Index) is a metric used to evaluate muscle development. Unlike BMI, FFMI excludes body fat influence, more accurately reflecting muscle mass level. FFMI is particularly suitable for evaluating muscle development in fitness enthusiasts and athletes.',
    advantages: 'FFMI Advantages',
    advantagesList: [
      'More accurately evaluates muscle development without body fat influence',
      'Height-adjusted for comparison between people of different heights',
      'Can be used to determine if approaching "natural limit" muscle mass',
      'Helps set reasonable fitness goals and expectations',
    ],
    howToImprove: 'How to Improve FFMI (Increase Muscle Mass)',
    improvementList: [
      'Strength training: 3-5 times per week, focus on compound movements',
      'Protein intake: 1.6-2.2g protein per kg body weight',
      'Adequate sleep: 7-9 hours of quality sleep per night',
      'Progressive overload: Gradually increase training intensity and weight',
    ],
    vsBmi: 'FFMI vs BMI',
    vsBmiContent: 'BMI only considers height and weight, unable to distinguish muscle from fat. A muscular athlete may have high BMI but actually be very healthy. FFMI excludes body fat, focusing on evaluating lean mass (mainly muscle), making it a more meaningful metric for fitness enthusiasts.',
    formula: 'Calculation Formula',
    formulaContent: [
      'Lean Mass = Weight × (1 - Body Fat%/100)',
      'FFMI = Lean Mass / Height²',
      'Adjusted FFMI = FFMI + 6.1 × (1.8 - Height)',
    ],
  },
  reference: {
    title: 'FFMI Reference Standards',
    headers: {
      range: 'FFMI Range',
      maleRating: 'Male Rating',
      femaleRating: 'Female Rating',
    },
    rows: [
      { range: '< 15', rating: 'Low', description: 'Severely low muscle mass' },
      { range: '16 - 17', rating: 'Low', description: 'Below average muscle mass' },
      { range: '17 - 19', rating: 'Normal', description: 'Average muscle mass' },
      { range: '19 - 21', rating: 'Good', description: 'Above average muscle mass' },
      { range: '21 - 23', rating: 'Excellent', description: 'Well developed muscles' },
      { range: '> 23', rating: 'Elite', description: 'Near natural limit or suspicious' },
    ],
  },
  validation: {
    heightRange: 'Please enter valid height (100-250 cm)',
    weightRange: 'Please enter valid weight (30-300 kg)',
    bodyFatRange: 'Please enter valid body fat (3-60%)',
  },
};
