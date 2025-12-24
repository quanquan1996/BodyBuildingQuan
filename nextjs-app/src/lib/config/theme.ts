// 薄荷健康风格主题配置

// 工具渐变色配置 - 柔和温暖的色系
export const toolGradients = {
  'ffmi-calculator': {
    from: '#F5D0A9',  // 暖黄
    to: '#E8C291',
    angle: 135,
  },
  'skinfold-calculator': {
    from: '#F8C4C4',  // 柔粉
    to: '#F0AAAA',
    angle: 135,
  },
  'bmr-calculator': {
    from: '#A8E6CF',  // 薄荷绿
    to: '#88D8B0',
    angle: 135,
  },
  'heart-rate-calculator': {
    from: '#B8E0D2',  // 淡青绿
    to: '#95D5B2',
    angle: 135,
  },
  'pose-comparator': {
    from: '#D4A5FF',  // 淡紫
    to: '#C490E4',
    angle: 135,
  },
  'grecian-calculator': {
    from: '#FFE5B4',  // 杏色
    to: '#FFD699',
    angle: 135,
  },
  'carb-cycling-calculator': {
    from: '#7DD3A0',  // 清新绿
    to: '#5AC57A',
    angle: 135,
  },
  'fat-loss-diet-calculator': {
    from: '#B5EAD7',  // 薄荷奶绿
    to: '#9DDFC5',
    angle: 135,
  },
  'high-carb-diet-calculator': {
    from: '#FFEAA7',  // 柔黄
    to: '#FDCB6E',
    angle: 135,
  },
  'metabolic-damage-test': {
    from: '#C9B1FF',  // 淡紫蓝
    to: '#A29BFE',
    angle: 135,
  },
  'muscle-anatomy': {
    from: '#FF9A9E',  // 珊瑚粉
    to: '#FECFEF',
    angle: 135,
  },
} as const;

export type ToolId = keyof typeof toolGradients;

// 获取渐变样式
export function getGradientStyle(toolId: ToolId) {
  const gradient = toolGradients[toolId];
  return {
    background: `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`,
  };
}

// 获取渐变CSS字符串
export function getGradientCSS(toolId: ToolId) {
  const gradient = toolGradients[toolId];
  return `linear-gradient(${gradient.angle}deg, ${gradient.from}, ${gradient.to})`;
}

// 主色调
export const colors = {
  primary: '#4CAF50',
  primaryLight: '#81C784',
  primaryDark: '#388E3C',
  background: '#F5F7FA',
  card: '#FFFFFF',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    muted: '#9CA3AF',
  },
  border: '#E5E7EB',
  input: '#F3F4F6',
};

// 间距
export const spacing = {
  cardPadding: '20px',
  sectionGap: '16px',
  iconSize: {
    sm: 48,
    md: 56,
    lg: 64,
  },
};

// 圆角
export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '999px',
};

// 阴影
export const shadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
};

// 工具配置（包含图标映射）
export const toolConfigs: Record<ToolId, { title: string; icon: string }> = {
  'ffmi-calculator': { title: 'FFMI计算器', icon: 'calculator' },
  'skinfold-calculator': { title: '体脂夹计算器', icon: 'ruler' },
  'bmr-calculator': { title: '代谢计算器', icon: 'flame' },
  'heart-rate-calculator': { title: '心率区间计算器', icon: 'heart' },
  'pose-comparator': { title: '健美造型评分器', icon: 'camera' },
  'grecian-calculator': { title: '古典比例计算器', icon: 'ratio' },
  'carb-cycling-calculator': { title: '碳循环计算器', icon: 'refresh' },
  'fat-loss-diet-calculator': { title: '减脂饮食计算器', icon: 'salad' },
  'high-carb-diet-calculator': { title: '高碳减脂计算器', icon: 'wheat' },
  'metabolic-damage-test': { title: '代谢受损检测器', icon: 'activity' },
  'muscle-anatomy': { title: '3D肌肉解剖图', icon: 'bone' },
};
