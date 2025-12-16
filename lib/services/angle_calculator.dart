import 'dart:math';
import 'dart:ui';
import '../models/pose_result.dart';

/// 角度计算结果
class AngleResult {
  final String name;
  final double referenceAngle;
  final double userAngle;
  final double difference;
  final String description;

  AngleResult({
    required this.name,
    required this.referenceAngle,
    required this.userAngle,
    required this.difference,
    required this.description,
  });

  /// 差异评级
  String get rating {
    final absDiff = difference.abs();
    if (absDiff <= 5) return '优秀';
    if (absDiff <= 10) return '良好';
    if (absDiff <= 20) return '一般';
    return '需改进';
  }

  /// 差异颜色
  int get ratingColorValue {
    final absDiff = difference.abs();
    if (absDiff <= 5) return 0xFF4CAF50; // 绿色
    if (absDiff <= 10) return 0xFF8BC34A; // 浅绿
    if (absDiff <= 20) return 0xFFFF9800; // 橙色
    return 0xFFF44336; // 红色
  }

  /// 单项得分 (0-100)
  double get score {
    final absDiff = difference.abs();
    if (absDiff <= 5) return 100;
    if (absDiff <= 10) return 90;
    if (absDiff <= 20) return 70;
    if (absDiff <= 30) return 50;
    return 30;
  }
}

/// 计算总体造型分数
double calculateTotalScore(List<AngleResult> angles) {
  if (angles.isEmpty) return 0;
  final total = angles.fold<double>(0, (sum, a) => sum + a.score);
  return total / angles.length;
}

/// 获取分数评级
String getScoreRating(double score) {
  if (score >= 90) return '完美';
  if (score >= 80) return '优秀';
  if (score >= 70) return '良好';
  if (score >= 60) return '及格';
  return '需改进';
}

/// 健美造型角度计算服务
class AngleCalculator {
  /// 计算三点形成的角度（度数）
  double calculateAngle(Offset a, Offset b, Offset c) {
    final ba = Offset(a.dx - b.dx, a.dy - b.dy);
    final bc = Offset(c.dx - b.dx, c.dy - b.dy);

    final dotProduct = ba.dx * bc.dx + ba.dy * bc.dy;
    final magnitudeBA = sqrt(ba.dx * ba.dx + ba.dy * ba.dy);
    final magnitudeBC = sqrt(bc.dx * bc.dx + bc.dy * bc.dy);

    if (magnitudeBA == 0 || magnitudeBC == 0) return 0;

    final cosAngle = dotProduct / (magnitudeBA * magnitudeBC);
    final clampedCos = cosAngle.clamp(-1.0, 1.0);
    final angleRad = acos(clampedCos);

    return angleRad * 180 / pi;
  }

  /// 计算所有健美关键角度
  List<AngleResult> calculateBodybuildingAngles(
    PoseResult refPose,
    PoseResult userPose,
    Size imageSize,
  ) {
    final results = <AngleResult>[];

    // 1. 左手肘角度（二头肌展示）
    results.add(_calculateJointAngle(
      refPose,
      userPose,
      imageSize,
      PoseResult.leftShoulder,
      PoseResult.leftElbow,
      PoseResult.leftWrist,
      '左手肘角度',
      '二头肌展示角度，影响肌肉峰值展示',
    ));

    // 2. 右手肘角度
    results.add(_calculateJointAngle(
      refPose,
      userPose,
      imageSize,
      PoseResult.rightShoulder,
      PoseResult.rightElbow,
      PoseResult.rightWrist,
      '右手肘角度',
      '二头肌展示角度，影响肌肉峰值展示',
    ));

    // 3. 左肩角度（三角肌展示）
    results.add(_calculateJointAngle(
      refPose,
      userPose,
      imageSize,
      PoseResult.leftHip,
      PoseResult.leftShoulder,
      PoseResult.leftElbow,
      '左肩角度',
      '手臂抬起角度，影响三角肌和背阔肌展示',
    ));

    // 4. 右肩角度
    results.add(_calculateJointAngle(
      refPose,
      userPose,
      imageSize,
      PoseResult.rightHip,
      PoseResult.rightShoulder,
      PoseResult.rightElbow,
      '右肩角度',
      '手臂抬起角度，影响三角肌和背阔肌展示',
    ));

    // 5. 左膝角度（股四头肌展示）
    results.add(_calculateJointAngle(
      refPose,
      userPose,
      imageSize,
      PoseResult.leftHip,
      PoseResult.leftKnee,
      PoseResult.leftAnkle,
      '左膝角度',
      '腿部弯曲角度，影响股四头肌线条',
    ));

    // 6. 右膝角度
    results.add(_calculateJointAngle(
      refPose,
      userPose,
      imageSize,
      PoseResult.rightHip,
      PoseResult.rightKnee,
      PoseResult.rightAnkle,
      '右膝角度',
      '腿部弯曲角度，影响股四头肌线条',
    ));

    // 7. 躯干倾斜角度
    results.add(_calculateTorsoAngle(refPose, userPose, imageSize));

    // 8. 肩宽髋宽比（V字形）
    results.add(_calculateVTaperRatio(refPose, userPose, imageSize));

    return results;
  }

  AngleResult _calculateJointAngle(
    PoseResult refPose,
    PoseResult userPose,
    Size imageSize,
    int pointA,
    int pointB,
    int pointC,
    String name,
    String description,
  ) {
    final refA = refPose.getPoint(pointA, imageSize);
    final refB = refPose.getPoint(pointB, imageSize);
    final refC = refPose.getPoint(pointC, imageSize);

    final userA = userPose.getPoint(pointA, imageSize);
    final userB = userPose.getPoint(pointB, imageSize);
    final userC = userPose.getPoint(pointC, imageSize);

    final refAngle = calculateAngle(refA, refB, refC);
    final userAngle = calculateAngle(userA, userB, userC);

    return AngleResult(
      name: name,
      referenceAngle: refAngle,
      userAngle: userAngle,
      difference: userAngle - refAngle,
      description: description,
    );
  }

  AngleResult _calculateTorsoAngle(
    PoseResult refPose,
    PoseResult userPose,
    Size imageSize,
  ) {
    // 计算肩膀中点到髋部中点的连线与垂直线的夹角
    double getTorsoTilt(PoseResult pose) {
      final ls = pose.getPoint(PoseResult.leftShoulder, imageSize);
      final rs = pose.getPoint(PoseResult.rightShoulder, imageSize);
      final lh = pose.getPoint(PoseResult.leftHip, imageSize);
      final rh = pose.getPoint(PoseResult.rightHip, imageSize);

      final shoulderMid = Offset((ls.dx + rs.dx) / 2, (ls.dy + rs.dy) / 2);
      final hipMid = Offset((lh.dx + rh.dx) / 2, (lh.dy + rh.dy) / 2);

      final dx = shoulderMid.dx - hipMid.dx;
      final dy = hipMid.dy - shoulderMid.dy; // Y轴向下为正

      if (dy == 0) return 90;
      return atan(dx / dy) * 180 / pi;
    }

    final refAngle = getTorsoTilt(refPose);
    final userAngle = getTorsoTilt(userPose);

    return AngleResult(
      name: '躯干倾斜',
      referenceAngle: refAngle,
      userAngle: userAngle,
      difference: userAngle - refAngle,
      description: '身体前后倾斜角度，影响整体姿态平衡',
    );
  }

  AngleResult _calculateVTaperRatio(
    PoseResult refPose,
    PoseResult userPose,
    Size imageSize,
  ) {
    // 计算肩宽/髋宽比例（用角度表示差异）
    double getVTaper(PoseResult pose) {
      final ls = pose.getPoint(PoseResult.leftShoulder, imageSize);
      final rs = pose.getPoint(PoseResult.rightShoulder, imageSize);
      final lh = pose.getPoint(PoseResult.leftHip, imageSize);
      final rh = pose.getPoint(PoseResult.rightHip, imageSize);

      final shoulderWidth = (rs.dx - ls.dx).abs();
      final hipWidth = (rh.dx - lh.dx).abs();

      if (hipWidth == 0) return 0;
      // 转换为角度表示（比例 * 45度作为基准）
      return (shoulderWidth / hipWidth) * 45;
    }

    final refRatio = getVTaper(refPose);
    final userRatio = getVTaper(userPose);

    return AngleResult(
      name: 'V字比例',
      referenceAngle: refRatio,
      userAngle: userRatio,
      difference: userRatio - refRatio,
      description: '肩宽与髋宽比例，数值越大V字形越明显',
    );
  }
}
