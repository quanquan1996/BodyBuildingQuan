import 'dart:typed_data';
import 'dart:convert';
import '../models/pose_result.dart';
import '../models/pose_landmark.dart';
import 'mediapipe_interop.dart';

/// 姿态检测异常
class PoseDetectionException implements Exception {
  final String message;
  const PoseDetectionException(this.message);

  @override
  String toString() => 'PoseDetectionException: $message';
}

/// 姿态检测服务
class PoseDetectionService {
  bool _isInitialized = false;

  /// 是否已初始化
  bool get isInitialized => _isInitialized;

  /// 初始化 MediaPipe
  Future<void> initialize() async {
    if (_isInitialized) return;

    final success = await MediaPipeInterop.initialize();
    if (!success) {
      throw const PoseDetectionException('MediaPipe 初始化失败，请刷新页面重试');
    }
    _isInitialized = true;
  }

  /// 从图片字节数据检测姿态
  /// [imageBytes] 图片的字节数据
  /// [mimeType] 图片 MIME 类型，默认为 image/jpeg
  Future<PoseResult> detectPose(Uint8List imageBytes, {String mimeType = 'image/jpeg'}) async {
    if (!_isInitialized) {
      await initialize();
    }

    // 将图片字节转换为 Data URL
    final base64 = base64Encode(imageBytes);
    final dataUrl = 'data:$mimeType;base64,$base64';

    // 调用 MediaPipe 检测
    final landmarks = await MediaPipeInterop.detectPose(dataUrl);

    if (landmarks == null || landmarks.isEmpty) {
      throw const PoseDetectionException('未检测到人体姿态，请上传包含完整人体的图片');
    }

    // 转换为 PoseResult
    final poseLandmarks = landmarks.map((l) => PoseLandmark(
      x: l['x'] as double,
      y: l['y'] as double,
      z: l['z'] as double,
      visibility: l['visibility'] as double,
    )).toList();

    return PoseResult(landmarks: poseLandmarks);
  }

  /// 检查服务是否就绪
  bool isReady() {
    return _isInitialized && MediaPipeInterop.isReady();
  }
}
