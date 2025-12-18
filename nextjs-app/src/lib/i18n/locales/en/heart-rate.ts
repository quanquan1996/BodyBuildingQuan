// Heart Rate Calculator - English

import type { HeartRateCalculatorDict } from '../zh/heart-rate';

export const heartRateCalculator: HeartRateCalculatorDict = {
  title: 'Heart Rate Zone Calculator',
  description: 'Calculate aerobic heart rate training zones for scientific exercise intensity guidance',
  metaDescription: 'Free heart rate zone calculator. Calculate optimal training heart rate zones based on age and resting heart rate.',
  form: {
    age: 'Age',
    restingHR: 'Resting Heart Rate',
    maxHR: 'Max Heart Rate (Optional)',
    calculate: 'Calculate Zones',
  },
  result: {
    title: 'Results',
    maxHR: 'Max Heart Rate',
    zones: 'Training Zones',
    zone1: 'Zone 1 - Recovery',
    zone2: 'Zone 2 - Fat Burn',
    zone3: 'Zone 3 - Aerobic',
    zone4: 'Zone 4 - Threshold',
    zone5: 'Zone 5 - Maximum',
  },
  explanation: {
    title: 'Heart Rate Training Zones Explained',
    intro:
      'Heart rate training zones are different intensity ranges based on maximum heart rate, each corresponding to different training effects. Understanding and utilizing heart rate zones can make your aerobic training more scientific and efficient.',
    zones: {
      title: 'Five Heart Rate Zones',
      items: [
        {
          name: 'Zone 1 - Warm Up',
          range: '50-60%',
          description: 'Very light activity, suitable for warm-up and recovery. Can talk easily, barely sweating.',
          color: 'gray',
        },
        {
          name: 'Zone 2 - Fat Burn',
          range: '60-70%',
          description: 'Optimal fat burning zone, suitable for long aerobic sessions. Can speak full sentences, light sweating.',
          color: 'blue',
        },
        {
          name: 'Zone 3 - Aerobic',
          range: '70-80%',
          description: 'Core zone for improving cardio endurance, moderate intensity. Speaking becomes difficult, noticeable sweating.',
          color: 'green',
        },
        {
          name: 'Zone 4 - Anaerobic',
          range: '80-90%',
          description: 'High intensity training, improves speed endurance and lactate threshold. Can only say a few words, heavy sweating.',
          color: 'orange',
        },
        {
          name: 'Zone 5 - Maximum',
          range: '90-100%',
          description: 'Maximum intensity output, can only be maintained briefly. Cannot speak, all-out effort.',
          color: 'red',
        },
      ],
    },
    formulas: {
      standard: {
        title: 'Standard Formula',
        maxHR: 'Max Heart Rate:',
        maxHRFormula: 'MHR = 220 - Age',
        targetHR: 'Target Heart Rate:',
        targetHRFormula: 'THR = MHR × Intensity%',
      },
      karvonen: {
        title: 'Karvonen Formula',
        hrr: 'Heart Rate Reserve:',
        hrrFormula: 'HRR = MHR - Resting HR',
        targetHR: 'Target Heart Rate:',
        targetHRFormula: 'THR = Resting HR + HRR × Intensity%',
      },
    },
    tips: {
      title: 'Training Tips',
      items: [
        'For fat loss: 70-80% of time in Zone 2, occasionally Zone 3',
        'For endurance: Mainly Zone 3, with Zone 2 for recovery',
        'For speed: Interval training, Zone 4-5 with Zone 1-2 recovery',
        'Beginners should start in Zone 2 and gradually increase intensity',
      ],
    },
  },
};
