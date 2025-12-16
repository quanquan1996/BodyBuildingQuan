import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import '../models/pose_result.dart';

/// 单张图片骨架显示组件
class SinglePoseWidget extends StatefulWidget {
  final Uint8List imageBytes;
  final PoseResult pose;
  final Color skeletonColor;
  final String label;

  const SinglePoseWidget({
    super.key,
    required this.imageBytes,
    required this.pose,
    required this.skeletonColor,
    required this.label,
  });

  @override
  State<SinglePoseWidget> createState() => _SinglePoseWidgetState();
}

class _SinglePoseWidgetState extends State<SinglePoseWidget> {
  ui.Image? _image;
  Size _imageSize = Size.zero;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadImage();
  }

  @override
  void didUpdateWidget(SinglePoseWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.imageBytes != widget.imageBytes) {
      _loadImage();
    }
  }

  Future<void> _loadImage() async {
    setState(() => _isLoading = true);
    try {
      final codec = await ui.instantiateImageCodec(widget.imageBytes);
      final frame = await codec.getNextFrame();
      if (mounted) {
        setState(() {
          _image = frame.image;
          _imageSize = Size(
            frame.image.width.toDouble(),
            frame.image.height.toDouble(),
          );
          _isLoading = false;
        });
      }
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading || _image == null) {
      return const Center(child: CircularProgressIndicator());
    }

    return Column(
      children: [
        // 标签
        Container(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Text(
            widget.label,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
        ),
        // 图片和骨架
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: CustomPaint(
              size: Size.infinite,
              painter: _SinglePosePainter(
                image: _image!,
                imageSize: _imageSize,
                pose: widget.pose,
                skeletonColor: widget.skeletonColor,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _SinglePosePainter extends CustomPainter {
  final ui.Image image;
  final Size imageSize;
  final PoseResult pose;
  final Color skeletonColor;

  _SinglePosePainter({
    required this.image,
    required this.imageSize,
    required this.pose,
    required this.skeletonColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    // 计算缩放和偏移
    final scaleX = size.width / imageSize.width;
    final scaleY = size.height / imageSize.height;
    final scale = scaleX < scaleY ? scaleX : scaleY;

    final scaledWidth = imageSize.width * scale;
    final scaledHeight = imageSize.height * scale;
    final offsetX = (size.width - scaledWidth) / 2;
    final offsetY = (size.height - scaledHeight) / 2;

    // 绘制背景图片
    final srcRect = Rect.fromLTWH(0, 0, imageSize.width, imageSize.height);
    final dstRect = Rect.fromLTWH(offsetX, offsetY, scaledWidth, scaledHeight);
    canvas.drawImageRect(image, srcRect, dstRect, Paint());

    // 绘制骨架
    final paint = Paint()
      ..color = skeletonColor
      ..strokeWidth = 3.0
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final jointPaint = Paint()
      ..color = skeletonColor
      ..style = PaintingStyle.fill;

    Offset transform(Offset point) {
      return Offset(
        point.dx * scale + offsetX,
        point.dy * scale + offsetY,
      );
    }

    // 绘制骨骼连接线
    for (final connection in PoseResult.skeletonConnections) {
      final start = transform(pose.getPoint(connection[0], imageSize));
      final end = transform(pose.getPoint(connection[1], imageSize));
      canvas.drawLine(start, end, paint);
    }

    // 绘制关节点
    for (int i = 0; i < pose.landmarks.length; i++) {
      if (_isMainJoint(i)) {
        final point = transform(pose.getPoint(i, imageSize));
        canvas.drawCircle(point, 5.0, jointPaint);
      }
    }
  }

  bool _isMainJoint(int index) {
    // 健美造型相关的所有关节点
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
        index == PoseResult.rightAnkle ||
        // 手部
        index == PoseResult.leftIndex ||
        index == PoseResult.rightIndex ||
        index == PoseResult.leftThumb ||
        index == PoseResult.rightThumb ||
        index == PoseResult.leftPinky ||
        index == PoseResult.rightPinky ||
        // 脚部
        index == PoseResult.leftHeel ||
        index == PoseResult.rightHeel ||
        index == PoseResult.leftFootIndex ||
        index == PoseResult.rightFootIndex;
  }

  @override
  bool shouldRepaint(covariant _SinglePosePainter oldDelegate) {
    return image != oldDelegate.image || pose != oldDelegate.pose;
  }
}
