import 'dart:async';
import 'dart:js_interop';
import 'dart:js_interop_unsafe';

/// 初始化 MediaPipe Pose Landmarker
@JS('initializePoseLandmarker')
external JSPromise<JSBoolean> _initializePoseLandmarker();

/// 从 Data URL 检测姿态
@JS('detectPoseFromDataUrl')
external JSPromise<JSArray?> _detectPoseFromDataUrl(JSString dataUrl);

/// 检查 MediaPipe 是否就绪
@JS('isMediaPipeReady')
external JSBoolean _isMediaPipeReady();

/// MediaPipe Interop 封装类
class MediaPipeInterop {
  /// 初始化 MediaPipe
  static Future<bool> initialize() async {
    try {
      final result = await _initializePoseLandmarker().toDart;
      return result.toDart;
    } catch (e) {
      print('MediaPipe initialization error: $e');
      return false;
    }
  }

  /// 从 Data URL 检测姿态
  /// 返回关键点列表，如果未检测到则返回 null
  static Future<List<Map<String, dynamic>>?> detectPose(String dataUrl) async {
    try {
      final jsResult = await _detectPoseFromDataUrl(dataUrl.toJS).toDart;
      if (jsResult == null) return null;

      final List<Map<String, dynamic>> landmarks = [];
      final jsArray = jsResult.toDart;
      
      for (final item in jsArray) {
        final jsObj = item as JSObject;
        landmarks.add({
          'x': (jsObj['x'] as JSNumber).toDartDouble,
          'y': (jsObj['y'] as JSNumber).toDartDouble,
          'z': (jsObj['z'] as JSNumber).toDartDouble,
          'visibility': (jsObj['visibility'] as JSNumber?)?.toDartDouble ?? 1.0,
        });
      }
      
      return landmarks;
    } catch (e) {
      print('Pose detection error: $e');
      return null;
    }
  }

  /// 检查 MediaPipe 是否就绪
  static bool isReady() {
    try {
      return _isMediaPipeReady().toDart;
    } catch (e) {
      return false;
    }
  }
}
