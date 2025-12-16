import 'dart:ui';

/// 姿态关键点数据模型
class PoseLandmark {
  /// 归一化 X 坐标 [0, 1]
  final double x;

  /// 归一化 Y 坐标 [0, 1]
  final double y;

  /// 深度信息 (相对于髋部中心)
  final double z;

  /// 可见度 [0, 1]
  final double visibility;

  const PoseLandmark({
    required this.x,
    required this.y,
    this.z = 0.0,
    this.visibility = 1.0,
  });

  /// 将归一化坐标转换为图片像素坐标
  Offset toOffset(Size imageSize) {
    return Offset(x * imageSize.width, y * imageSize.height);
  }

  /// 从 JS 对象创建
  factory PoseLandmark.fromJs(dynamic jsLandmark) {
    return PoseLandmark(
      x: (jsLandmark['x'] as num?)?.toDouble() ?? 0.0,
      y: (jsLandmark['y'] as num?)?.toDouble() ?? 0.0,
      z: (jsLandmark['z'] as num?)?.toDouble() ?? 0.0,
      visibility: (jsLandmark['visibility'] as num?)?.toDouble() ?? 1.0,
    );
  }

  @override
  String toString() => 'PoseLandmark(x: $x, y: $y, z: $z, v: $visibility)';
}
