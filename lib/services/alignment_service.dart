import 'dart:math';
import 'dart:ui';
import '../models/pose_result.dart';

/// 骨架对齐服务
/// 负责将参考骨架对齐并缩放到用户骨架的坐标系
class AlignmentService {
  /// 计算躯干中心点
  /// 使用左右肩膀和左右髋部四点的平均值
  Offset calculateTorsoCenter(PoseResult pose, Size imageSize) {
    final ls = pose.getPoint(PoseResult.leftShoulder, imageSize);
    final rs = pose.getPoint(PoseResult.rightShoulder, imageSize);
    final lh = pose.getPoint(PoseResult.leftHip, imageSize);
    final rh = pose.getPoint(PoseResult.rightHip, imageSize);

    return Offset(
      (ls.dx + rs.dx + lh.dx + rh.dx) / 4,
      (ls.dy + rs.dy + lh.dy + rh.dy) / 4,
    );
  }

  /// 计算躯干高度
  /// 肩膀中点到髋部中点的距离
  double _calculateTorsoHeight(PoseResult pose, Size imageSize) {
    final ls = pose.getPoint(PoseResult.leftShoulder, imageSize);
    final rs = pose.getPoint(PoseResult.rightShoulder, imageSize);
    final lh = pose.getPoint(PoseResult.leftHip, imageSize);
    final rh = pose.getPoint(PoseResult.rightHip, imageSize);

    final shoulderMid = Offset((ls.dx + rs.dx) / 2, (ls.dy + rs.dy) / 2);
    final hipMid = Offset((lh.dx + rh.dx) / 2, (lh.dy + rh.dy) / 2);

    return _distance(shoulderMid, hipMid);
  }

  /// 计算缩放因子
  /// 用户躯干高度 / 参考躯干高度
  double calculateScaleFactor(
    PoseResult refPose,
    PoseResult userPose,
    Size imageSize,
  ) {
    final refHeight = _calculateTorsoHeight(refPose, imageSize);
    final userHeight = _calculateTorsoHeight(userPose, imageSize);

    // 防止除零
    if (refHeight < 1.0) return 1.0;

    return userHeight / refHeight;
  }

  /// 将参考骨架转换为幽灵骨架坐标
  /// 公式: P_ghost = (P_ref - RefCenter) * ScaleFactor + UserCenter
  List<Offset> transformToGhostPoints(
    PoseResult refPose,
    PoseResult userPose,
    Size imageSize,
  ) {
    final refCenter = calculateTorsoCenter(refPose, imageSize);
    final userCenter = calculateTorsoCenter(userPose, imageSize);
    final scale = calculateScaleFactor(refPose, userPose, imageSize);

    return List.generate(refPose.landmarks.length, (index) {
      final refPoint = refPose.getPoint(index, imageSize);
      return Offset(
        (refPoint.dx - refCenter.dx) * scale + userCenter.dx,
        (refPoint.dy - refCenter.dy) * scale + userCenter.dy,
      );
    });
  }

  /// 计算两点之间的距离
  double _distance(Offset a, Offset b) {
    return sqrt(pow(a.dx - b.dx, 2) + pow(a.dy - b.dy, 2));
  }

  /// 计算误差向量（用户关节点到幽灵关节点的距离）
  Map<int, double> calculateErrorDistances(
    PoseResult userPose,
    List<Offset> ghostPoints,
    Size imageSize,
  ) {
    final errors = <int, double>{};

    for (final jointIndex in PoseResult.errorJoints) {
      final userPoint = userPose.getPoint(jointIndex, imageSize);
      final ghostPoint = ghostPoints[jointIndex];
      errors[jointIndex] = _distance(userPoint, ghostPoint);
    }

    return errors;
  }
}
