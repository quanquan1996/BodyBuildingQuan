import 'dart:ui';
import 'package:flutter/material.dart';
import '../models/pose_result.dart';

/// 骨架叠加绘制器
/// 在用户图片上绘制三层内容：
/// - Layer 1: 用户骨架 (绿色实线)
/// - Layer 2: 幽灵骨架 (青色半透明)
/// - Layer 3: 误差向量 (红色连线)
class PoseOverlayPainter extends CustomPainter {
  /// 用户姿态结果
  final PoseResult userPose;

  /// 幽灵骨架点（转换后的参考骨架）
  final List<Offset> ghostPoints;

  /// 图片尺寸
  final Size imageSize;

  /// 用户骨架颜色
  final Color userSkeletonColor;

  /// 幽灵骨架颜色
  final Color ghostSkeletonColor;

  /// 误差向量颜色
  final Color errorVectorColor;

  /// 线条宽度
  final double strokeWidth;

  /// 关节点半径
  final double jointRadius;

  PoseOverlayPainter({
    required this.userPose,
    required this.ghostPoints,
    required this.imageSize,
    this.userSkeletonColor = Colors.greenAccent,
    this.ghostSkeletonColor = const Color(0x8000FFFF), // cyan with 0.5 opacity
    this.errorVectorColor = Colors.redAccent,
    this.strokeWidth = 3.0,
    this.jointRadius = 5.0,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 计算缩放比例以适应画布
    final scaleX = size.width / imageSize.width;
    final scaleY = size.height / imageSize.height;
    final scale = scaleX < scaleY ? scaleX : scaleY;

    // 计算偏移以居中显示
    final offsetX = (size.width - imageSize.width * scale) / 2;
    final offsetY = (size.height - imageSize.height * scale) / 2;

    // 转换坐标的辅助函数
    Offset transform(Offset point) {
      return Offset(
        point.dx * scale + offsetX,
        point.dy * scale + offsetY,
      );
    }

    // Layer 1: 绘制用户骨架 (绿色实线)
    _drawSkeleton(
      canvas,
      userPose,
      imageSize,
      transform,
      userSkeletonColor,
      false,
    );

    // Layer 2: 绘制幽灵骨架 (青色半透明虚线)
    _drawGhostSkeleton(
      canvas,
      ghostPoints,
      transform,
      ghostSkeletonColor,
    );

    // Layer 3: 绘制误差向量 (红色连线)
    _drawErrorVectors(
      canvas,
      userPose,
      ghostPoints,
      imageSize,
      transform,
    );
  }

  /// 绘制骨架
  void _drawSkeleton(
    Canvas canvas,
    PoseResult pose,
    Size imageSize,
    Offset Function(Offset) transform,
    Color color,
    bool isDashed,
  ) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final jointPaint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    // 绘制骨骼连接线
    for (final connection in PoseResult.skeletonConnections) {
      final start = transform(pose.getPoint(connection[0], imageSize));
      final end = transform(pose.getPoint(connection[1], imageSize));

      if (isDashed) {
        _drawDashedLine(canvas, start, end, paint);
      } else {
        canvas.drawLine(start, end, paint);
      }
    }

    // 绘制关节点
    for (int i = 0; i < pose.landmarks.length; i++) {
      // 只绘制主要关节点
      if (_isMainJoint(i)) {
        final point = transform(pose.getPoint(i, imageSize));
        canvas.drawCircle(point, jointRadius, jointPaint);
      }
    }
  }

  /// 绘制幽灵骨架
  void _drawGhostSkeleton(
    Canvas canvas,
    List<Offset> points,
    Offset Function(Offset) transform,
    Color color,
  ) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = strokeWidth
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final jointPaint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;

    // 绘制骨骼连接线（虚线）
    for (final connection in PoseResult.skeletonConnections) {
      final start = transform(points[connection[0]]);
      final end = transform(points[connection[1]]);
      _drawDashedLine(canvas, start, end, paint);
    }

    // 绘制关节点
    for (int i = 0; i < points.length; i++) {
      if (_isMainJoint(i)) {
        final point = transform(points[i]);
        canvas.drawCircle(point, jointRadius * 0.8, jointPaint);
      }
    }
  }

  /// 绘制误差向量
  void _drawErrorVectors(
    Canvas canvas,
    PoseResult userPose,
    List<Offset> ghostPoints,
    Size imageSize,
    Offset Function(Offset) transform,
  ) {
    final paint = Paint()
      ..color = errorVectorColor
      ..strokeWidth = strokeWidth * 0.8
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    for (final jointIndex in PoseResult.errorJoints) {
      final userPoint = transform(userPose.getPoint(jointIndex, imageSize));
      final ghostPoint = transform(ghostPoints[jointIndex]);

      // 绘制连接线
      canvas.drawLine(userPoint, ghostPoint, paint);

      // 在误差线末端绘制小箭头
      _drawArrowHead(canvas, userPoint, ghostPoint, paint);
    }
  }

  /// 绘制虚线
  void _drawDashedLine(Canvas canvas, Offset start, Offset end, Paint paint) {
    const dashLength = 8.0;
    const gapLength = 4.0;

    final dx = end.dx - start.dx;
    final dy = end.dy - start.dy;
    final distance = (Offset(dx, dy)).distance;

    if (distance < 1) return;

    final unitX = dx / distance;
    final unitY = dy / distance;

    var currentDistance = 0.0;
    var isDrawing = true;

    while (currentDistance < distance) {
      final segmentLength = isDrawing ? dashLength : gapLength;
      final nextDistance = currentDistance + segmentLength;

      if (isDrawing) {
        final startPoint = Offset(
          start.dx + unitX * currentDistance,
          start.dy + unitY * currentDistance,
        );
        final endPoint = Offset(
          start.dx + unitX * (nextDistance > distance ? distance : nextDistance),
          start.dy + unitY * (nextDistance > distance ? distance : nextDistance),
        );
        canvas.drawLine(startPoint, endPoint, paint);
      }

      currentDistance = nextDistance;
      isDrawing = !isDrawing;
    }
  }

  /// 绘制箭头
  void _drawArrowHead(Canvas canvas, Offset from, Offset to, Paint paint) {
    const arrowSize = 8.0;
    const arrowAngle = 0.5; // radians

    final dx = to.dx - from.dx;
    final dy = to.dy - from.dy;
    final angle = dy.isNaN || dx.isNaN ? 0.0 : dy == 0 && dx == 0 ? 0.0 : 
        dy >= 0 ? (dx >= 0 ? (dy / (dx.abs() + dy.abs())) * 1.57 : 3.14 - (dy / (dx.abs() + dy.abs())) * 1.57) :
        (dx >= 0 ? -(dy.abs() / (dx.abs() + dy.abs())) * 1.57 : -3.14 + (dy.abs() / (dx.abs() + dy.abs())) * 1.57);

    final path = Path();
    path.moveTo(to.dx, to.dy);
    path.lineTo(
      to.dx - arrowSize * (angle + arrowAngle).cos(),
      to.dy - arrowSize * (angle + arrowAngle).sin(),
    );
    path.moveTo(to.dx, to.dy);
    path.lineTo(
      to.dx - arrowSize * (angle - arrowAngle).cos(),
      to.dy - arrowSize * (angle - arrowAngle).sin(),
    );

    canvas.drawPath(path, paint);
  }

  /// 判断是否为主要关节点
  bool _isMainJoint(int index) {
    return index == PoseResult.leftShoulder ||
        index == PoseResult.rightShoulder ||
        index == PoseResult.leftElbow ||
        index == PoseResult.rightElbow ||
        index == PoseResult.leftWrist ||
        index == PoseResult.rightWrist ||
        index == PoseResult.leftHip ||
        index == PoseResult.rightHip ||
        index == PoseResult.leftKnee ||
        index == PoseResult.rightKnee ||
        index == PoseResult.leftAnkle ||
        index == PoseResult.rightAnkle;
  }

  @override
  bool shouldRepaint(covariant PoseOverlayPainter oldDelegate) {
    return userPose != oldDelegate.userPose ||
        ghostPoints != oldDelegate.ghostPoints ||
        imageSize != oldDelegate.imageSize;
  }
}

// 扩展 num 类型以支持 cos 和 sin
extension on double {
  double cos() => _cos(this);
  double sin() => _sin(this);
}

double _cos(double x) {
  return x.isNaN ? 0 : (1 - x * x / 2 + x * x * x * x / 24);
}

double _sin(double x) {
  return x.isNaN ? 0 : (x - x * x * x / 6 + x * x * x * x * x / 120);
}
