// Bodybuilding Pose Scorer - English

import type { PoseComparatorDict } from '../zh/pose-comparator';

export const poseComparator: PoseComparatorDict = {
  title: 'Bodybuilding Pose Scorer',
  description: 'AI-powered bodybuilding pose analysis to evaluate your pose score',
  metaDescription:
    'Free AI bodybuilding pose scoring tool. Upload your pose photos for automatic body posture detection and scoring to help improve your presentation.',
  uploadReference: 'Upload Reference Pose',
  uploadUser: 'Upload Your Pose',
  compare: 'Start Scoring',
  result: 'Score Result',
  noPoseDetected:
    'Could not detect body pose. Please upload an image with a complete human body.',
  uploadHint: 'Click or drag image here',
  scoring: {
    title: 'Scoring Details',
    overall: 'Overall Score',
    symmetry: 'Symmetry',
    proportion: 'Proportion',
    pose: 'Pose Quality',
  },
  categories: {
    frontDouble: 'Front Double Biceps',
    frontLat: 'Front Lat Spread',
    sideChest: 'Side Chest',
    backDouble: 'Back Double Biceps',
    backLat: 'Back Lat Spread',
    abdominal: 'Abdominal & Thigh',
    mostMuscular: 'Most Muscular',
  },
  scoreRatings: {
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    needsWork: 'Needs Work',
  },
  angleRatings: {
    perfect: 'Perfect',
    good: 'Excellent',
    acceptable: 'Good',
    needsAdjustment: 'Needs Adjustment',
  },
  angleNames: {
    leftElbow: 'Left Elbow Angle',
    rightElbow: 'Right Elbow Angle',
    leftShoulder: 'Left Shoulder Angle',
    rightShoulder: 'Right Shoulder Angle',
    leftKnee: 'Left Knee Angle',
    rightKnee: 'Right Knee Angle',
  },
  angleDescriptions: {
    biceps: 'Biceps display angle',
    armRaise: 'Arm raise angle',
    legBend: 'Leg bend angle',
  },
  explanation: {
    title: 'Scoring Principles',
    aiDetection: {
      title: 'AI Pose Detection',
      description:
        'This tool uses Google MediaPipe Pose Landmarker technology, which identifies 33 key body landmarks through deep learning models, including head, shoulders, elbows, wrists, hips, knees, and ankles. The AI model is trained on extensive human image datasets and can accurately recognize body posture under various angles and lighting conditions.',
    },
    angleComparison: {
      title: 'Scoring Methodology',
      description:
        'The scoring system is based on comparative analysis of key angles including shoulder angles, arm angles, torso angles, and leg angles. Final score = 100 - Σ(joint angle differences × weights). Higher scores indicate closer match to the reference pose.',
      referenceLabel: 'Reference',
      userLabel: 'Your Pose',
    },
    scoringSystem: {
      title: 'Score Ratings',
      description:
        '90-100 is Excellent, 75-89 is Good, 60-74 is Fair, below 60 Needs Work.',
    },
    symmetryScore: {
      title: 'Symmetry Score',
      description:
        'Symmetry score is based on differences between left and right key angles. Smaller differences indicate better symmetry.',
    },
  },
  poseCategories: {
    title: 'Bodybuilding Pose Categories',
    keyPointsLabel: 'Key Points:',
    tipsLabel: 'Tips:',
    poses: {
      frontDoubleBiceps: {
        name: 'Front Double Biceps',
        keyPoints: ['Arms bent to display biceps', 'Shoulders spread', 'Abs tight'],
        tips: ['Elbow angle ~90 degrees', 'Shoulders level', 'Core engaged'],
      },
      frontLatSpread: {
        name: 'Front Lat Spread',
        keyPoints: ['Hands on hips', 'Lats spread', 'Chest up'],
        tips: ['Arms out', 'Shoulders down', 'Waist tight'],
      },
      sideChest: {
        name: 'Side Chest',
        keyPoints: ['Side stance', 'Forearm bent', 'Chest up'],
        tips: ['Body sideways', 'Chest contracted', 'Abs tight'],
      },
      backDoubleBiceps: {
        name: 'Back Double Biceps',
        keyPoints: ['Back to audience', 'Arms bent', 'Back muscles displayed'],
        tips: ['Shoulder blades tight', 'Lats spread', 'Glutes tight'],
      },
      backLatSpread: {
        name: 'Back Lat Spread',
        keyPoints: ['Back to audience', 'Hands on hips', 'Lats maximally spread'],
        tips: ['Shoulders down', 'Back spread', 'Waist tight'],
      },
      abdominalAndThigh: {
        name: 'Abdominal & Thigh',
        keyPoints: ['Hands behind head', 'Abs tight', 'Thighs displayed'],
        tips: ['Core engaged', 'Legs flexed', 'Stable posture'],
      },
      mostMuscular: {
        name: 'Most Muscular',
        keyPoints: ['Full body flex', 'Power display', 'Multiple variations'],
        tips: ['Full body tension', 'Maximum muscle contraction', 'Maintain balance'],
      },
    },
  },
  limitations: {
    title: 'Usage Notes & Limitations',
    items: [
      {
        title: 'Reference Only',
        description:
          'Scoring results are for practice reference only and cannot replace professional coaching or competition judging. Bodybuilding scoring involves multiple dimensions including muscle mass, definition, symmetry, and skin condition. This tool only evaluates pose angle similarity.',
      },
      {
        title: 'Technical Limitations',
        description:
          '2D image limitations, occlusion issues, lighting effects, clothing interference, and angle differences may affect detection accuracy.',
      },
      {
        title: 'Best Practices',
        description:
          'Use same shooting angle, ensure good lighting, wear fitted clothing, full body in frame, take multiple shots for best results.',
      },
      {
        title: 'Professional Advice',
        description:
          'If you are preparing for competition or want to systematically improve your posing, seek guidance from a professional bodybuilding coach. This tool can serve as a daily practice aid.',
      },
    ],
    conclusion:
      'Scores reflect pose angle similarity only, not overall bodybuilding level assessment',
  },
};
