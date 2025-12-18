// Metabolic Damage Test - English

import type { MetabolicDamageTestDict } from '../zh/metabolic-damage';

export const metabolicDamageTest: MetabolicDamageTestDict = {
  title: 'Metabolic Damage Test',
  description: 'Assess metabolic adaptation level and get reverse dieting recovery plan',
  metaDescription:
    'Free metabolic damage assessment tool. Evaluate if your metabolism has adapted due to long-term low calories and get recovery recommendations.',
  form: {
    currentCalories: 'Current Daily Calories',
    weight: 'Weight',
    bodyFat: 'Body Fat',
    dietDuration: 'Diet Duration (weeks)',
    symptoms: 'Symptoms',
    calculate: 'Assess Damage Level',
    symptomsList: {
      fatigue: 'Chronic Fatigue',
      coldHands: 'Cold Hands/Feet',
      hairLoss: 'Hair Loss',
      lowLibido: 'Low Libido',
      poorSleep: 'Poor Sleep Quality',
      noProgress: 'No Progress Despite Low Calories',
    },
  },
  result: {
    title: 'Assessment Results',
    damageLevel: 'Damage Level',
    expectedBMR: 'Expected BMR',
    actualIntake: 'Actual Intake',
    deficit: 'Deficit',
    recommendation: 'Recommendation',
    levels: {
      none: 'No Damage',
      mild: 'Mild Adaptation',
      moderate: 'Moderate Damage',
      severe: 'Severe Damage',
    },
  },
  explanation: {
    title: 'FAQ',
    faq: [
      {
        question: 'Is metabolic damage real or just an excuse?',
        intro:
          'Metabolic adaptation is a scientifically verified physiological phenomenon, not an excuse. Research shows long-term calorie restriction leads to:',
        points: [
          'NEAT (Non-Exercise Activity Thermogenesis) decrease - you unconsciously reduce daily activity',
          'Thyroid hormone T3 decrease - directly affects metabolic rate',
          'Leptin levels drop - increases hunger, reduces energy expenditure',
          'Muscle protein synthesis decreases - may lead to muscle loss',
        ],
        conclusion:
          "But this doesn't mean you can't lose fat, just that you need a more scientific approach.",
      },
      {
        question: "Why am I not losing weight despite eating very little?",
        intro: 'Possible reasons include:',
        points: [
          'Inaccurate calorie counting - underestimating actual intake (most common)',
          'Metabolic adaptation - body has reduced energy expenditure',
          'Water fluctuation - weight changes masked by water',
          'Stress and sleep - elevated cortisol causing water retention',
          'Weekend indulgence - offsetting weekday deficit',
        ],
        conclusion:
          'Recommend first confirming calorie counting accuracy before considering metabolic adaptation.',
      },
      {
        question: 'What is reverse dieting? How to do it?',
        intro:
          'Reverse dieting is a strategy of gradually increasing calorie intake to restore metabolism without significant fat gain. How to do it:',
        points: [
          'Increase 50-100 kcal per week (mainly from carbohydrates)',
          'Keep protein intake stable (1.6-2.2g/kg body weight)',
          'Continue strength training to maintain muscle mass',
          'Monitor weight changes, allow small increases (mainly glycogen and water)',
          'Continue 4-16 weeks until reaching maintenance calories',
        ],
      },
      {
        question: 'How long does metabolic recovery take?',
        intro: 'Recovery time depends on the degree of metabolic adaptation:',
        points: [
          'Mild adaptation: 2-4 weeks of diet break can recover',
          'Moderate damage: 4-8 weeks of reverse dieting',
          'Severe damage: 8-16 weeks or longer',
        ],
        conclusion:
          'Research shows most metabolic adaptation can be reversed after returning to normal eating, but patience is needed.',
      },
      {
        question: 'How to avoid metabolic damage?',
        intro: 'Strategies to prevent metabolic adaptation:',
        points: [
          'Moderate calorie deficit: 300-500 kcal per day, not too aggressive',
          'Regular diet breaks: Schedule 1-2 weeks at maintenance every 4-8 weeks',
          'Maintain protein: High protein diet protects muscle',
          'Strength training: Maintaining muscle mass is key',
          'Control cardio: Avoid excessive cardio',
          'Adequate sleep: 7-9 hours quality sleep',
          'Manage stress: High stress accelerates metabolic decline',
        ],
      },
      {
        question: 'Is this test accurate?',
        intro: 'This test evaluates based on:',
        points: [
          'Comparison of current calorie intake vs theoretical BMR',
          'Match between weight change trend and calorie deficit',
          'Diet duration',
        ],
        conclusion:
          "Limitations: This is an estimation tool and cannot replace professional metabolic testing (like indirect calorimetry). Actual metabolic rate is affected by many factors including genetics, hormone levels, muscle mass, etc. If you have serious metabolic issues, consult a doctor or nutritionist for professional assessment.",
      },
    ],
  },
  reference: {
    title: 'Metabolic Damage Reference',
    whatIs: {
      title: 'What is Metabolic Damage?',
      description:
        'Metabolic Damage (Metabolic Adaptation) refers to the adaptive response where the body reduces energy expenditure for survival after long-term calorie restriction. This is not actual "damage" but a protective mechanism.',
    },
    symptoms: {
      title: 'Common Signs of Metabolic Adaptation',
      items: [
        { emoji: '⚖️', text: 'Weight plateau' },
        { emoji: '🥶', text: 'Frequently feeling cold' },
        { emoji: '😴', text: 'Increased fatigue' },
        { emoji: '💪', text: 'Strength decline' },
        { emoji: '🍽️', text: 'Intense hunger' },
        { emoji: '😤', text: 'Mood swings' },
        { emoji: '💤', text: 'Poor sleep quality' },
        { emoji: '🏃', text: 'Decreased exercise performance' },
      ],
    },
    levels: {
      title: 'Damage Level Explanation',
      normal: {
        title: '✅ Normal Metabolism (0-24 points)',
        description: 'Calorie intake and weight changes match expectations, metabolism functioning normally',
      },
      mild: {
        title: '⚠️ Mild Adaptation (25-49 points)',
        description:
          'Slight metabolic adaptation present, recommend scheduling diet breaks or moderately increasing calories',
      },
      moderate: {
        title: '🔶 Moderate Damage (50-74 points)',
        description: 'Metabolism noticeably decreased, recommend 4-8 weeks of reverse dieting recovery',
      },
      severe: {
        title: '🔴 Severe Damage (75-100 points)',
        description:
          'Metabolism severely damaged, strongly recommend stopping diet and doing 8-16 weeks systematic recovery',
      },
    },
    factors: {
      title: 'Factors Affecting Metabolic Adaptation',
      items: [
        'Size of calorie deficit',
        'Diet duration',
        'Protein intake',
        'Strength training frequency',
        'Sleep quality',
        'Stress levels',
      ],
    },
    recovery: {
      title: 'Recovery Strategies',
      strategies: [
        { title: 'Reverse Dieting', description: 'Increase 50-100 kcal weekly, gradually return to maintenance' },
        { title: 'Diet Break', description: 'Eat at maintenance for 2-4 weeks to let body recover' },
        { title: 'Strength Training', description: 'Maintain or increase strength training to preserve muscle' },
        { title: 'Adequate Sleep', description: '7-9 hours quality sleep per night' },
      ],
    },
  },
};
