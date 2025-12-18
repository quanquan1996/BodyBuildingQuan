// 健美造型评分器 - 中文

export interface PoseComparatorDict {
  title: string;
  description: string;
  metaDescription: string;
  uploadReference: string;
  uploadUser: string;
  compare: string;
  result: string;
  noPoseDetected: string;
  uploadHint: string;
  scoring: {
    title: string;
    overall: string;
    symmetry: string;
    proportion: string;
    pose: string;
  };
  categories: {
    frontDouble: string;
    frontLat: string;
    sideChest: string;
    backDouble: string;
    backLat: string;
    abdominal: string;
    mostMuscular: string;
  };
  scoreRatings: {
    excellent: string;
    good: string;
    fair: string;
    needsWork: string;
  };
  angleRatings: {
    perfect: string;
    good: string;
    acceptable: string;
    needsAdjustment: string;
  };
  angleNames: {
    leftElbow: string;
    rightElbow: string;
    leftShoulder: string;
    rightShoulder: string;
    leftKnee: string;
    rightKnee: string;
  };
  angleDescriptions: {
    biceps: string;
    armRaise: string;
    legBend: string;
  };
  explanation: {
    title: string;
    aiDetection: { title: string; description: string };
    angleComparison: {
      title: string;
      description: string;
      referenceLabel: string;
      userLabel: string;
    };
    scoringSystem: { title: string; description: string };
    symmetryScore: { title: string; description: string };
  };
  poseCategories: {
    title: string;
    keyPointsLabel: string;
    tipsLabel: string;
    poses: {
      frontDoubleBiceps: { name: string; keyPoints: string[]; tips: string[] };
      frontLatSpread: { name: string; keyPoints: string[]; tips: string[] };
      sideChest: { name: string; keyPoints: string[]; tips: string[] };
      backDoubleBiceps: { name: string; keyPoints: string[]; tips: string[] };
      backLatSpread: { name: string; keyPoints: string[]; tips: string[] };
      abdominalAndThigh: { name: string; keyPoints: string[]; tips: string[] };
      mostMuscular: { name: string; keyPoints: string[]; tips: string[] };
    };
  };
  limitations: {
    title: string;
    items: { title: string; description: string }[];
    conclusion: string;
  };
}

export const poseComparator: PoseComparatorDict = {
  title: '健美造型评分器',
  description: 'AI驱动的健美造型分析，评估你的健美姿势得分',
  metaDescription:
    '免费AI健美造型评分工具，上传你的健美造型照片，自动检测身体姿态并评分，帮助健美爱好者改进造型展示。',
  uploadReference: '上传参考造型',
  uploadUser: '上传你的造型',
  compare: '开始评分',
  result: '评分结果',
  noPoseDetected: '未能检测到人体姿态，请上传包含完整人体的图片',
  uploadHint: '点击或拖拽图片到此处',
  scoring: {
    title: '评分详情',
    overall: '综合得分',
    symmetry: '对称性',
    proportion: '比例',
    pose: '姿势质量',
  },
  categories: {
    frontDouble: '前展双二头',
    frontLat: '前展背阔',
    sideChest: '侧展胸肌',
    backDouble: '背展双二头',
    backLat: '背展背阔',
    abdominal: '腹部大腿',
    mostMuscular: '最强肌肉',
  },
  scoreRatings: {
    excellent: '优秀',
    good: '良好',
    fair: '一般',
    needsWork: '需改进',
  },
  angleRatings: {
    perfect: '完美',
    good: '优秀',
    acceptable: '良好',
    needsAdjustment: '需改进',
  },
  angleNames: {
    leftElbow: '左手肘角度',
    rightElbow: '右手肘角度',
    leftShoulder: '左肩角度',
    rightShoulder: '右肩角度',
    leftKnee: '左膝角度',
    rightKnee: '右膝角度',
  },
  angleDescriptions: {
    biceps: '二头肌展示角度',
    armRaise: '手臂抬起角度',
    legBend: '腿部弯曲角度',
  },
  explanation: {
    title: '评分原理与依据',
    aiDetection: {
      title: 'AI 姿态检测原理',
      description:
        '本工具使用 Google MediaPipe Pose Landmarker 技术，通过深度学习模型识别人体的 33 个关键点位置，包括头部、肩膀、手肘、手腕、髋部、膝盖、脚踝等。AI 模型经过大量人体图像训练，能够在各种角度和光照条件下准确识别人体姿态。',
    },
    angleComparison: {
      title: '评分计算依据',
      description:
        '评分系统基于肩部角度、手臂角度、躯干角度、腿部角度等关键角度的对比分析。最终得分 = 100 - Σ(各关节角度差异 × 权重)，分数越高表示与参考造型越接近。',
      referenceLabel: '参考图',
      userLabel: '我的图',
    },
    scoringSystem: {
      title: '评分等级说明',
      description: '90-100分为优秀，75-89分为良好，60-74分为一般，60分以下需改进。',
    },
    symmetryScore: {
      title: '对称性评分',
      description: '对称性评分基于左右两侧关键角度的差异，差异越小对称性越好。',
    },
  },
  poseCategories: {
    title: '健美造型分类介绍',
    keyPointsLabel: '要点：',
    tipsLabel: '技巧：',
    poses: {
      frontDoubleBiceps: {
        name: '前展双二头',
        keyPoints: ['双臂弯曲展示肱二头肌', '肩部展开', '腹部收紧'],
        tips: ['手肘角度约90度', '双肩水平', '核心收紧'],
      },
      frontLatSpread: {
        name: '前展背阔',
        keyPoints: ['双手叉腰', '背阔肌展开', '胸部挺起'],
        tips: ['手臂外展', '肩部下沉', '腰部收紧'],
      },
      sideChest: {
        name: '侧展胸肌',
        keyPoints: ['侧面站立', '前臂弯曲', '胸部挺起'],
        tips: ['身体侧向', '胸肌收缩', '腹部收紧'],
      },
      backDoubleBiceps: {
        name: '背展双二头',
        keyPoints: ['背对观众', '双臂弯曲', '背部肌肉展示'],
        tips: ['肩胛骨收紧', '背阔肌展开', '臀部收紧'],
      },
      backLatSpread: {
        name: '背展背阔',
        keyPoints: ['背对观众', '双手叉腰', '背阔肌最大化展开'],
        tips: ['肩部下沉', '背部展开', '腰部收紧'],
      },
      abdominalAndThigh: {
        name: '腹部大腿',
        keyPoints: ['双手抱头', '腹肌收紧', '大腿展示'],
        tips: ['核心收紧', '腿部绷紧', '姿态稳定'],
      },
      mostMuscular: {
        name: '最强肌肉',
        keyPoints: ['全身肌肉收紧', '力量感展示', '多种变体'],
        tips: ['全身发力', '肌肉最大化收缩', '保持平衡'],
      },
    },
  },
  limitations: {
    title: '使用说明与局限性',
    items: [
      {
        title: '仅供参考',
        description:
          '本工具的评分结果仅供练习参考，不能替代专业教练的指导和比赛裁判的评判。健美造型的评分涉及肌肉量、分离度、对称性、皮肤状态等多个维度，本工具仅能评估姿态角度的相似度。',
      },
      {
        title: '技术局限',
        description:
          '2D 图像限制、遮挡问题、光照影响、服装干扰、角度差异等因素可能影响检测准确性。',
      },
      {
        title: '最佳使用建议',
        description:
          '使用相同拍摄角度、确保光线充足、穿着贴身服装、全身入镜、多次拍摄取最佳效果。',
      },
      {
        title: '专业建议',
        description:
          '如果你正在备赛或希望系统提升造型水平，建议寻求专业健美教练的指导。本工具可以作为日常练习的辅助。',
      },
    ],
    conclusion: '评分仅反映姿态角度相似度，不代表整体健美水平评价',
  },
};
