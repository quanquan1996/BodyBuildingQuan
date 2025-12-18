// Grecian Ideal Calculator - English

import type { GrecianCalculatorDict } from '../zh/grecian';

export const grecianCalculator: GrecianCalculatorDict = {
  title: 'Grecian Ideal Calculator',
  description: 'Evaluate body proportions based on golden ratio, identify weak points',
  metaDescription:
    'Free Grecian ideal calculator. Calculate your ideal body measurements based on wrist circumference and golden ratio principles.',
  form: {
    wrist: 'Wrist Circumference',
    measurements: 'Current Measurements',
    chest: 'Chest',
    waist: 'Waist',
    hips: 'Hips',
    biceps: 'Biceps',
    forearm: 'Forearm',
    thigh: 'Thigh',
    calf: 'Calf',
    neck: 'Neck',
    calculate: 'Calculate Ideal',
  },
  result: {
    title: 'Results',
    ideal: 'Ideal',
    current: 'Current',
    difference: 'Difference',
    score: 'Proportion Score',
  },
  explanation: {
    title: 'About Grecian Ideal Calculator',
    faq: {
      whatIs: {
        question: 'What is the Grecian Ideal?',
        answer: [
          'The Grecian Ideal originates from ancient Greek studies of human aesthetics, believing that the perfect human body should conform to specific mathematical proportions. These proportions center on the golden ratio (φ = 1.618) and were widely applied in ancient Greek sculpture and architecture.',
          'In modern bodybuilding, these classical proportions have been rediscovered and applied, becoming important standards for judging body symmetry and aesthetics. Legendary bodybuilders like Steve Reeves and Frank Zane are famous for approaching these classical proportions.',
        ],
      },
      goldenRatio: {
        question: 'Golden Ratio in Bodybuilding',
        answer:
          'The golden ratio (approximately 1.618) is the most common proportion in nature and is considered the most aesthetically pleasing. In bodybuilding, it is mainly applied to:',
        points: [
          'Shoulder-to-waist ratio: Ideal shoulder circumference should be 1.618 times the waist, creating the classic V-taper',
          'Chest-to-waist ratio: Chest and waist ratio should also approach 1.618',
          'Upper-to-lower body ratio: Leg length to upper body proportion',
        ],
      },
      wristMethod: {
        question: 'Why Use Wrist Circumference as Baseline?',
        answer: [
          'The wrist is one of the few body parts with almost no muscle or fat coverage, its circumference mainly determined by bone size. Therefore, wrist circumference is a reliable indicator of individual frame size.',
          'The method of calculating ideal body proportions based on wrist circumference was proposed by John McCallum in the 1960s and later widely adopted by bodybuilders like Steve Reeves. This method accounts for individual differences, providing personalized goals for people with different frame sizes.',
        ],
      },
      symmetry: {
        question: 'Importance of Symmetry in Bodybuilding',
        answer: [
          'In bodybuilding competition scoring, symmetry is one of the three main judging criteria (the other two being muscle mass and definition). Symmetry refers not only to left-right balance but more importantly to the proportional coordination of upper-lower and front-back body.',
          'The Grecian Ideal calculator helps you identify weak points in your physique, allowing targeted training rather than blindly pursuing muscle mass in certain areas. Remember: bodybuilding is about sculpting, not stacking.',
        ],
      },
      limitations: {
        question: 'Calculator Limitations',
        intro:
          'This calculator is based on classical formulas and the golden ratio, but note:',
        points: [
          'Everyone has different bone structure and muscle attachment points, ideal proportions vary individually',
          'Measurement errors affect accuracy, recommend taking multiple measurements and averaging',
          'Classical proportions are more suitable for aesthetics-focused physique/classic bodybuilding, not extreme muscle mass bodybuilding',
          "Women's ideal proportions differ from men's, this calculator is primarily designed for men",
        ],
      },
    },
  },
  reference: {
    title: 'Grecian Ideal Reference Standards',
    goldenRatio: {
      title: 'Golden Ratio (φ = 1.618)',
      description:
        'Ancient Greeks believed 1.618 is the most perfect proportion, widely applied in architecture, art, and human aesthetics. In bodybuilding, ideal shoulder-to-waist and chest-to-waist ratios should approach this value.',
    },
    steveReeves: {
      title: 'Steve Reeves Standards',
      description:
        'Legendary bodybuilder Steve Reeves is considered to have the physique closest to the classical ideal:',
      standards: [
        'Biceps = Neck = Calves',
        'Chest = Wrist × 6.5',
        'Waist = Wrist × 4.0',
        'Shoulders = Waist × 1.618',
      ],
    },
    measurementGuide: {
      title: 'Measurement Guide',
      items: [
        'Wrist: Measure at the narrowest point (where bone protrudes)',
        'Shoulders: Arms down, measure around the widest point',
        'Chest: At nipple level, during normal breathing',
        'Waist: At navel level, relaxed state',
        'Biceps: At peak of flexed bicep',
        'Thigh: At the thickest part near the groin',
        'Calf: At the thickest part',
      ],
    },
    wristImportance: {
      title: 'Why Wrist Circumference Matters',
      description:
        'Wrist circumference reflects your frame size and serves as the baseline for calculating ideal body proportions. People with larger frames naturally need more muscle mass to achieve visual balance.',
    },
  },
};
