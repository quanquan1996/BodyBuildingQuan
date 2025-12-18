import { PoseResult, PoseLandmark, LandmarkIndex } from '@/types/pose';

export interface AngleResult {
  name: string;
  jointIndex: LandmarkIndex;
  referenceAngle: number;
  userAngle: number;
  difference: number;
  description: string;
}

// 计算三点形成的角度（度数）
export function calculateAngle(a: PoseLandmark, b: PoseLandmark, c: PoseLandmark): number {
  const ba = { x: a.x - b.x, y: a.y - b.y };
  const bc = { x: c.x - b.x, y: c.y - b.y };

  const dotProduct = ba.x * bc.x + ba.y * bc.y;
  const magnitudeBA = Math.sqrt(ba.x * ba.x + ba.y * ba.y);
  const magnitudeBC = Math.sqrt(bc.x * bc.x + bc.y * bc.y);

  if (magnitudeBA === 0 || magnitudeBC === 0) return 0;

  const cosAngle = dotProduct / (magnitudeBA * magnitudeBC);
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));
  const angleRad = Math.acos(clampedCos);

  return angleRad * (180 / Math.PI);
}

// 健美造型关键角度定义（不含翻译文本）
const BODYBUILDING_ANGLES = [
  {
    nameKey: 'leftElbow',
    descKey: 'biceps',
    jointIndex: LandmarkIndex.LEFT_ELBOW,
    points: [LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW, LandmarkIndex.LEFT_WRIST],
  },
  {
    nameKey: 'rightElbow',
    descKey: 'biceps',
    jointIndex: LandmarkIndex.RIGHT_ELBOW,
    points: [LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW, LandmarkIndex.RIGHT_WRIST],
  },
  {
    nameKey: 'leftShoulder',
    descKey: 'armRaise',
    jointIndex: LandmarkIndex.LEFT_SHOULDER,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW],
  },
  {
    nameKey: 'rightShoulder',
    descKey: 'armRaise',
    jointIndex: LandmarkIndex.RIGHT_SHOULDER,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW],
  },
  {
    nameKey: 'leftKnee',
    descKey: 'legBend',
    jointIndex: LandmarkIndex.LEFT_KNEE,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_KNEE, LandmarkIndex.LEFT_ANKLE],
  },
  {
    nameKey: 'rightKnee',
    descKey: 'legBend',
    jointIndex: LandmarkIndex.RIGHT_KNEE,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_KNEE, LandmarkIndex.RIGHT_ANKLE],
  },
];

// 计算所有健美关键角度
export function calculateBodybuildingAngles(
  refPose: PoseResult,
  userPose: PoseResult,
  angleNames?: Record<string, string>,
  angleDescriptions?: Record<string, string>
): AngleResult[] {
  return BODYBUILDING_ANGLES.map(({ nameKey, descKey, jointIndex, points }) => {
    const [a, b, c] = points;
    const refAngle = calculateAngle(
      refPose.landmarks[a],
      refPose.landmarks[b],
      refPose.landmarks[c]
    );
    const userAngle = calculateAngle(
      userPose.landmarks[a],
      userPose.landmarks[b],
      userPose.landmarks[c]
    );

    return {
      name: angleNames?.[nameKey] || nameKey,
      jointIndex,
      referenceAngle: refAngle,
      userAngle: userAngle,
      difference: userAngle - refAngle,
      description: angleDescriptions?.[descKey] || descKey,
    };
  });
}

// 计算总体造型分数 (0-100)
export function calculateTotalScore(angles: AngleResult[]): number {
  if (angles.length === 0) return 0;

  const scores = angles.map((a) => {
    const absDiff = Math.abs(a.difference);
    if (absDiff <= 5) return 100;
    if (absDiff <= 10) return 90;
    if (absDiff <= 15) return 80;
    if (absDiff <= 20) return 70;
    if (absDiff <= 30) return 50;
    return 30;
  });

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

// 获取分数评级
export function getScoreRating(score: number, labels?: { excellent: string; good: string; fair: string; needsWork: string }): { text: string; color: string } {
  const defaultLabels = { excellent: 'Excellent', good: 'Good', fair: 'Fair', needsWork: 'Needs Work' };
  const l = labels || defaultLabels;
  
  if (score >= 90) return { text: l.excellent, color: 'text-green-500' };
  if (score >= 75) return { text: l.good, color: 'text-green-400' };
  if (score >= 60) return { text: l.fair, color: 'text-yellow-500' };
  return { text: l.needsWork, color: 'text-red-500' };
}

// 获取单项评级
export function getAngleRating(diff: number, labels?: { perfect: string; good: string; acceptable: string; needsAdjustment: string }): { text: string; color: string } {
  const defaultLabels = { perfect: 'Perfect', good: 'Excellent', acceptable: 'Good', needsAdjustment: 'Needs Adjustment' };
  const l = labels || defaultLabels;
  
  const absDiff = Math.abs(diff);
  if (absDiff <= 5) return { text: l.perfect, color: 'bg-green-100 text-green-700' };
  if (absDiff <= 10) return { text: l.good, color: 'bg-green-50 text-green-600' };
  if (absDiff <= 20) return { text: l.acceptable, color: 'bg-yellow-100 text-yellow-700' };
  return { text: l.needsAdjustment, color: 'bg-red-100 text-red-700' };
}
