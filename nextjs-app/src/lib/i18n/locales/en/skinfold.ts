// Skinfold Calculator - English

import type { SkinfoldCalculatorDict } from '../zh/skinfold';

export const skinfoldCalculator: SkinfoldCalculatorDict = {
  title: 'Skinfold Calculator',
  description:
    'Measure body fat using skinfold thickness method, supports 3-point and 7-point modes',
  metaDescription:
    'Free skinfold body fat calculator. Use Jackson-Pollock formula to accurately calculate body fat percentage through skinfold measurements.',
  form: {
    basicInfo: 'Basic Information',
    measurementMode: 'Measurement Mode',
    threePoint: '3-Point',
    sevenPoint: '7-Point',
    age: 'Age',
    gender: 'Gender',
    chest: 'Chest',
    abdomen: 'Abdomen',
    thigh: 'Thigh',
    triceps: 'Triceps',
    subscapular: 'Subscapular',
    suprailiac: 'Suprailiac',
    midaxillary: 'Midaxillary',
    calculate: 'Calculate Body Fat',
  },
  result: {
    title: 'Results',
    bodyFat: 'Body Fat %',
    fatMass: 'Fat Mass',
    leanMass: 'Lean Mass',
    category: 'Category',
  },
  categories: {
    essential: 'Essential Fat',
    athletic: 'Athletic',
    fitness: 'Fitness',
    average: 'Average',
    obese: 'Obese',
  },
  categoryLabels: {
    essential: 'Essential Fat (Possibly Too Low)',
    athlete: 'Athlete Level',
    fitness: 'Fitness Level',
    average: 'Average Level',
    obese: 'Overweight/Obese',
  },
  guide: {
    title: 'Measurement Sites Guide',
    tipsTitle: 'Measurement Tips',
    tips: [
      'Use a professional skinfold caliper with clear markings',
      'Pinch the skin with thumb and forefinger about 1cm apart',
      'Read the measurement 2-3 seconds after pinching',
      'Take 2-3 measurements at each site and use the average',
      'Keep muscles relaxed during measurement',
      'Measure at the same time under the same conditions',
    ],
    sitesTitle: 'Measurement Site Descriptions',
    modesTitle: 'Measurement Modes',
    simpleMode: {
      title: 'Simple Mode (3-Site)',
      description: 'Suitable for quick daily assessment, accuracy ±3-4%',
      male: 'Male: Chest, Abdomen, Thigh',
      female: 'Female: Triceps, Suprailiac, Thigh',
    },
    preciseMode: {
      title: 'Precise Mode (7-Site)',
      description: 'More comprehensive assessment, accuracy ±2-3%',
      sites:
        'Measure all 7 sites: Chest, Midaxillary, Triceps, Subscapular, Abdomen, Suprailiac, Thigh',
    },
    measurementSites: {
      chest: {
        name: 'Chest',
        description:
          'Diagonal fold at the midpoint between the pectoralis major and anterior axillary line',
        tips: 'Common male measurement site, fold direction parallel to pectoralis major fibers',
      },
      midaxillary: {
        name: 'Midaxillary',
        description:
          'Vertical fold at the intersection of midaxillary line and xiphoid process level',
        tips: 'Arms hanging naturally, measure directly below armpit',
      },
      triceps: {
        name: 'Triceps',
        description:
          'Vertical fold at the midpoint between acromion and olecranon on the posterior upper arm',
        tips: 'Arm hanging relaxed, measure at the midpoint of the posterior upper arm',
      },
      subscapular: {
        name: 'Subscapular',
        description:
          'Diagonal fold about 2cm below the inferior angle of the scapula at 45 degrees',
        tips: 'Fold direction parallel to the lower edge of scapula, approximately 45 degrees',
      },
      abdominal: {
        name: 'Abdominal',
        description: 'Vertical fold about 2-3cm lateral to the umbilicus',
        tips: 'Keep abdomen relaxed during measurement, do not contract',
      },
      suprailiac: {
        name: 'Suprailiac',
        description:
          'Diagonal fold above the iliac crest at the anterior axillary line',
        tips: 'Follow the natural direction of the iliac crest, approximately 45 degrees',
      },
      thigh: {
        name: 'Thigh',
        description:
          'Vertical fold at the midpoint between patella and inguinal crease on anterior thigh',
        tips: 'Sitting or standing, thigh relaxed, measure at quadriceps midpoint',
      },
    },
  },
  validation: {
    ageRange: 'Please enter valid age (18-80)',
    measurementRange: 'Please enter valid measurement (1-100 mm)',
  },
  explanation: {
    title: 'Calculation Principles',
    jacksonPollock: {
      title: 'Jackson-Pollock Formula',
      description:
        'This calculator uses the Jackson-Pollock formula, the most widely used skinfold body fat estimation method. It estimates total body fat by measuring subcutaneous fat thickness at specific sites.',
      formula:
        'Body Density = a - b×(sum of skinfolds) + c×(sum of skinfolds)² - d×(age)',
      note: 'Where a, b, c, d are gender-specific coefficients',
    },
    siriFormula: {
      title: 'Siri Formula',
      description:
        'After calculating body density, the Siri formula converts it to body fat percentage. This formula assumes fat tissue density of 0.9 g/cm³ and lean tissue density of 1.1 g/cm³.',
      formula: 'Body Fat (%) = (495 / Body Density) - 450',
    },
    accuracy: {
      title: 'Accuracy Notes',
      points: [
        'Skinfold method has a standard error of approximately ±3-4%',
        'Measurement technique and caliper quality affect results',
        'Accuracy may decrease for very low or very high body fat individuals',
        'Best used as a trend tracking tool rather than absolute reference',
        'For precise measurement, consider DEXA or hydrostatic weighing',
      ],
    },
    comparison: {
      title: 'Body Fat Measurement Methods Comparison',
      headers: ['Method', 'Accuracy', 'Cost', 'Convenience'],
      methods: [
        {
          name: 'DEXA Scan',
          accuracy: '⭐⭐⭐⭐⭐',
          cost: '💰💰💰',
          convenience: 'Requires professional equipment',
        },
        {
          name: 'Hydrostatic Weighing',
          accuracy: '⭐⭐⭐⭐⭐',
          cost: '💰💰💰',
          convenience: 'Requires professional equipment',
        },
        {
          name: 'Skinfold Method',
          accuracy: '⭐⭐⭐⭐',
          cost: '💰',
          convenience: 'Portable and easy',
        },
        {
          name: 'Bioelectrical Impedance',
          accuracy: '⭐⭐⭐',
          cost: '💰💰',
          convenience: 'Quick and convenient',
        },
        {
          name: 'Visual/Photo',
          accuracy: '⭐⭐',
          cost: 'Free',
          convenience: 'Most convenient',
        },
      ],
    },
  },
  reference: {
    title: 'Body Fat Reference Standards',
    maleTitle: 'Male Body Fat Standards',
    femaleTitle: 'Female Body Fat Standards',
    categories: {
      essential: 'Essential Fat',
      athletic: 'Athletic',
      fitness: 'Fitness',
      average: 'Average',
      obese: 'Obese',
    },
    maleRanges: {
      essential: '2-5%',
      athletic: '6-13%',
      fitness: '14-17%',
      average: '18-24%',
      obese: '>25%',
    },
    femaleRanges: {
      essential: '10-13%',
      athletic: '14-20%',
      fitness: '21-24%',
      average: '25-31%',
      obese: '>32%',
    },
    source: '* Reference standards from American College of Sports Medicine (ACSM)',
  },
};
