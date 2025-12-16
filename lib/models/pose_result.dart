import 'dart:ui';
import 'pose_landmark.dart';

/// 姿态检测结果
class PoseResult {
  /// 33 个关键点列表
  final List<PoseLandmark> landmarks;

  /// 检测是否有效
  bool get isValid => landmarks.length == 33;

  const PoseResult({required this.landmarks});

  /// 创建空结果
  factory PoseResult.empty() => const PoseResult(landmarks: []);

  /// 从 JS 数组创建
  factory PoseResult.fromJsList(List<dynamic> jsLandmarks) {
    final landmarks = jsLandmarks
        .map((l) => PoseLandmark.fromJs(l))
        .toList();
    return PoseResult(landmarks: landmarks);
  }

  /// 获取指定索引的关键点像素坐标
  Offset getPoint(int index, Size imageSize) {
    if (index < 0 || index >= landmarks.length) {
      return Offset.zero;
    }
    return landmarks[index].toOffset(imageSize);
  }

  // ========== MediaPipe 33 关键点索引常量 ==========
  
  // 面部
  static const int nose = 0;
  static const int leftEyeInner = 1;
  static const int leftEye = 2;
  static const int leftEyeOuter = 3;
  static const int rightEyeInner = 4;
  static const int rightEye = 5;
  static const int rightEyeOuter = 6;
  static const int leftEar = 7;
  static const int rightEar = 8;
  static const int mouthLeft = 9;
  static const int mouthRight = 10;

  // 上肢
  static const int leftShoulder = 11;
  static const int rightShoulder = 12;
  static const int leftElbow = 13;
  static const int rightElbow = 14;
  static const int leftWrist = 15;
  static const int rightWrist = 16;
  static const int leftPinky = 17;
  static const int rightPinky = 18;
  static const int leftIndex = 19;
  static const int rightIndex = 20;
  static const int leftThumb = 21;
  static const int rightThumb = 22;

  // 下肢
  static const int leftHip = 23;
  static const int rightHip = 24;
  static const int leftKnee = 25;
  static const int rightKnee = 26;
  static const int leftAnkle = 27;
  static const int rightAnkle = 28;
  static const int leftHeel = 29;
  static const int rightHeel = 30;
  static const int leftFootIndex = 31;
  static const int rightFootIndex = 32;

  // ========== 骨骼连接定义 ==========
  
  /// 用于绘制骨架的连接关系（健美造型完整版）
  static const List<List<int>> skeletonConnections = [
    // 躯干
    [leftShoulder, rightShoulder],
    [leftShoulder, leftHip],
    [rightShoulder, rightHip],
    [leftHip, rightHip],
    // 左臂
    [leftShoulder, leftElbow],
    [leftElbow, leftWrist],
    [leftWrist, leftIndex],   // 手腕到食指
    [leftWrist, leftThumb],   // 手腕到拇指
    [leftWrist, leftPinky],   // 手腕到小指
    // 右臂
    [rightShoulder, rightElbow],
    [rightElbow, rightWrist],
    [rightWrist, rightIndex],  // 手腕到食指
    [rightWrist, rightThumb],  // 手腕到拇指
    [rightWrist, rightPinky],  // 手腕到小指
    // 左腿
    [leftHip, leftKnee],
    [leftKnee, leftAnkle],
    [leftAnkle, leftHeel],     // 脚踝到脚跟
    [leftAnkle, leftFootIndex], // 脚踝到脚尖
    [leftHeel, leftFootIndex],  // 脚跟到脚尖
    // 右腿
    [rightHip, rightKnee],
    [rightKnee, rightAnkle],
    [rightAnkle, rightHeel],    // 脚踝到脚跟
    [rightAnkle, rightFootIndex], // 脚踝到脚尖
    [rightHeel, rightFootIndex],  // 脚跟到脚尖
  ];

  /// 用于绘制误差向量的关键关节索引
  static const List<int> errorJoints = [
    leftWrist,
    rightWrist,
    leftElbow,
    rightElbow,
    leftKnee,
    rightKnee,
  ];
}
