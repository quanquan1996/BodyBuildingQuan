import 'dart:typed_data';
import 'dart:ui' as ui;
import 'dart:math';
import 'package:flutter/material.dart';
import '../models/pose_result.dart';
import '../services/angle_calculator.dart';

/// 用户图片上显示骨架和关节角度差异
class ComparisonResultWidget extends StatefulWidget {
  final Uint8List userImageBytes;
  final PoseResult userPose;
  final PoseResult referencePose;
  final Size imageSize;
  final List<AngleResult> angleResults;

  const ComparisonResultWidget({
    super.key,
    required this.userImageBytes,
    required this.userPose,
    required this.referencePose,
    required this.imageSize,
    required this.angleResults,
  });

  @override
  State<ComparisonResultWidget> createState() => _ComparisonResultWidgetState();
}

class _ComparisonResultWidgetState extends State<ComparisonResultWidget> {
  ui.Image? _image;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadImage();
  }

  @override
  void didUpdateWidget(ComparisonResultWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.userImageBytes != widget.userImageBytes) _loadImage();
  }

  Future<void> _loadImage() async {
    setState(() => _isLoading = true);
    try {
      final codec = await ui.instantiateImageCodec(widget.userImageBytes);
      final frame = await codec.getNextFrame();
      if (mounted) setState(() { _image = frame.image; _isLoading = false; });
    } catch (e) {
      if (mounted) setState(() => _isLoading = false);
    }
  }


  @override
  Widget build(BuildContext context) {
    if (_isLoading || _image == null) {
      return const Center(child: CircularProgressIndicator());
    }
    return Column(children: [
      const Text('你的照片（角度差异标注）', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
      const SizedBox(height: 8),
      Expanded(
        child: ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: CustomPaint(
            size: Size.infinite,
            painter: _AngleDiffPainter(
              image: _image!,
              imageSize: widget.imageSize,
              userPose: widget.userPose,
              angleResults: widget.angleResults,
            ),
          ),
        ),
      ),
    ]);
  }
}

class _AngleDiffPainter extends CustomPainter {
  final ui.Image image;
  final Size imageSize;
  final PoseResult userPose;
  final List<AngleResult> angleResults;

  _AngleDiffPainter({
    required this.image,
    required this.imageSize,
    required this.userPose,
    required this.angleResults,
  });

  // 关节名称到索引的映射
  static const Map<String, int> jointMap = {
    '左手肘角度': PoseResult.leftElbow,
    '右手肘角度': PoseResult.rightElbow,
    '左肩角度': PoseResult.leftShoulder,
    '右肩角度': PoseResult.rightShoulder,
    '左膝角度': PoseResult.leftKnee,
    '右膝角度': PoseResult.rightKnee,
  };
