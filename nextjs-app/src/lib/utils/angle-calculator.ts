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

// 健美造型关键角度定义
const BODYBUILDING_ANGLES = [
  {
    name: '左手肘角度',
    jointIndex: LandmarkIndex.LEFT_ELBOW,
    points: [LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW, LandmarkIndex.LEFT_WRIST],
    description: '二头肌展示角度',
  },
  {
    name: '右手肘角度',
    jointIndex: LandmarkIndex.RIGHT_ELBOW,
    points: [LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW, LandmarkIndex.RIGHT_WRIST],
    description: '二头肌展示角度',
  },
  {
    name: '左肩角度',
    jointIndex: LandmarkIndex.LEFT_SHOULDER,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_SHOULDER, LandmarkIndex.LEFT_ELBOW],
    description: '手臂抬起角度',
  },
  {
    name: '右肩角度',
    jointIndex: LandmarkIndex.RIGHT_SHOULDER,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_SHOULDER, LandmarkIndex.RIGHT_ELBOW],
    description: '手臂抬起角度',
  },

  {
    name: '左膝角度',
    jointIndex: LandmarkIndex.LEFT_KNEE,
    points: [LandmarkIndex.LEFT_HIP, LandmarkIndex.LEFT_KNEE, LandmarkIndex.LEFT_ANKLE],
    description: '腿部弯曲角度',
  },
  {
    name: '右膝角度',
    jointIndex: LandmarkIndex.RIGHT_KNEE,
    points: [LandmarkIndex.RIGHT_HIP, LandmarkIndex.RIGHT_KNEE, LandmarkIndex.RIGHT_ANKLE],
    description: '腿部弯曲角度',
  },
];

// 计算所有健美关键角度
export function calculateBodybuildingAngles(
  refPose: PoseResult,
  userPose: PoseResult
): AngleResult[] {
  return BODYBUILDING_ANGLES.map(({ name, jointIndex, points, description }) => {
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
      name,
      jointIndex,
      referenceAngle: refAngle,
      userAngle: userAngle,
      difference: userAngle - refAngle,
      description,
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
export function getScoreRating(score: number): { text: string; color: string } {
  if (score >= 90) return { text: '完美', color: 'text-green-500' };
  if (score >= 80) return { text: '优秀', color: 'text-green-400' };
  if (score >= 70) return { text: '良好', color: 'text-yellow-500' };
  if (score >= 60) return { text: '及格', color: 'text-orange-500' };
  return { text: '需改进', color: 'text-red-500' };
}

// 获取单项评级
export function getAngleRating(diff: number): { text: string; color: string } {
  const absDiff = Math.abs(diff);
  if (absDiff <= 5) return { text: '优秀', color: 'bg-green-100 text-green-700' };
  if (absDiff <= 10) return { text: '良好', color: 'bg-green-50 text-green-600' };
  if (absDiff <= 20) return { text: '一般', color: 'bg-yellow-100 text-yellow-700' };
  return { text: '需改进', color: 'bg-red-100 text-red-700' };
}
