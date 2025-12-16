import 'dart:typed_data';
import 'dart:ui';
import 'package:flutter/material.dart';
import '../models/pose_result.dart';
import '../services/pose_detection_service.dart';
import '../services/angle_calculator.dart';
import '../widgets/image_upload_widget.dart';
import '../widgets/comparison_result_widget.dart';
import '../widgets/single_pose_widget.dart';
import '../widgets/angle_comparison_widget.dart';
import '../widgets/score_widget.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _poseService = PoseDetectionService();
  final _angleCalculator = AngleCalculator();

  Uint8List? _referenceImageBytes;
  Uint8List? _userImageBytes;
  PoseResult? _referencePose;
  PoseResult? _userPose;
  List<AngleResult>? _angleResults;
  Size? _userImageSize;
  Size? _refImageSize;
  double _totalScore = 0;

  bool _isProcessing = false;
  String? _errorMessage;
  bool _showResult = false;

  @override
  void initState() {
    super.initState();
    _initializeService();
  }

  Future<void> _initializeService() async {
    try { await _poseService.initialize(); }
    catch (e) { if (mounted) setState(() => _errorMessage = e.toString()); }
  }

  void _onReferenceImageSelected(Uint8List bytes, String fileName) {
    setState(() { _referenceImageBytes = bytes; _referencePose = null; _showResult = false; _errorMessage = null; });
    _tryProcessImages();
  }

  void _onUserImageSelected(Uint8List bytes, String fileName) {
    setState(() { _userImageBytes = bytes; _userPose = null; _showResult = false; _errorMessage = null; });
    _tryProcessImages();
  }


  Future<void> _tryProcessImages() async {
    if (_referenceImageBytes == null || _userImageBytes == null) return;
    setState(() { _isProcessing = true; _errorMessage = null; });

    try {
      _referencePose = await _poseService.detectPose(_referenceImageBytes!);
      _userPose = await _poseService.detectPose(_userImageBytes!);

      if (_referencePose!.isValid && _userPose!.isValid) {
        _userImageSize = await _getImageSize(_userImageBytes!);
        _refImageSize = await _getImageSize(_referenceImageBytes!);
        _angleResults = _angleCalculator.calculateBodybuildingAngles(_referencePose!, _userPose!, _userImageSize!);
        _totalScore = calculateTotalScore(_angleResults!);
        setState(() => _showResult = true);
      }
    } catch (e) { setState(() => _errorMessage = e.toString()); }
    finally { if (mounted) setState(() => _isProcessing = false); }
  }

  Future<Size> _getImageSize(Uint8List bytes) async {
    final codec = await instantiateImageCodec(bytes);
    final frame = await codec.getNextFrame();
    return Size(frame.image.width.toDouble(), frame.image.height.toDouble());
  }

  void _reset() {
    setState(() {
      _referenceImageBytes = null; _userImageBytes = null;
      _referencePose = null; _userPose = null;
      _angleResults = null; _userImageSize = null; _refImageSize = null;
      _totalScore = 0; _showResult = false; _errorMessage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('姿态对比'), centerTitle: true,
        actions: [if (_showResult) IconButton(onPressed: _reset, icon: const Icon(Icons.refresh), tooltip: '重新开始')]),
      body: LayoutBuilder(builder: (context, constraints) {
        if (_showResult && _referencePose != null && _userPose != null) {
          return _buildResultView(constraints);
        }
        return _buildUploadView(constraints);
      }),
    );
  }


  Widget _buildUploadView(BoxConstraints constraints) {
    final isWide = constraints.maxWidth > 800;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        if (_errorMessage != null) _buildError(),
        if (_isProcessing) _buildLoading(),
        if (isWide) _buildWideUpload() else _buildNarrowUpload(),
        const SizedBox(height: 24),
        _buildInstructions(),
      ]),
    );
  }

  Widget _buildError() => Container(
    padding: const EdgeInsets.all(16), margin: const EdgeInsets.only(bottom: 24),
    decoration: BoxDecoration(color: Colors.red.shade50, borderRadius: BorderRadius.circular(8), border: Border.all(color: Colors.red.shade200)),
    child: Row(children: [Icon(Icons.error_outline, color: Colors.red.shade700), const SizedBox(width: 12), Expanded(child: Text(_errorMessage!, style: TextStyle(color: Colors.red.shade700)))]),
  );

  Widget _buildLoading() => Container(
    padding: const EdgeInsets.all(16), margin: const EdgeInsets.only(bottom: 24),
    decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(8)),
    child: const Row(mainAxisAlignment: MainAxisAlignment.center, children: [SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2)), SizedBox(width: 12), Text('正在分析姿态...')]),
  );

  Widget _buildWideUpload() => Row(children: [
    Expanded(child: AspectRatio(aspectRatio: 3/4, child: ImageUploadWidget(label: '参考图', onImageSelected: _onReferenceImageSelected))),
    const SizedBox(width: 24),
    Expanded(child: AspectRatio(aspectRatio: 3/4, child: ImageUploadWidget(label: '用户图', onImageSelected: _onUserImageSelected))),
  ]);

  Widget _buildNarrowUpload() => Column(children: [
    AspectRatio(aspectRatio: 4/3, child: ImageUploadWidget(label: '参考图', onImageSelected: _onReferenceImageSelected)),
    const SizedBox(height: 16),
    AspectRatio(aspectRatio: 4/3, child: ImageUploadWidget(label: '用户图', onImageSelected: _onUserImageSelected)),
  ]);


  Widget _buildResultView(BoxConstraints constraints) {
    final isWide = constraints.maxWidth > 800;
    final imgHeight = constraints.maxHeight * 0.55;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(children: [
        _buildLegend(),
        const SizedBox(height: 16),

        // 左边参考图，右边对比结果（带角度虚线）
        if (isWide)
          SizedBox(
            height: imgHeight,
            child: Row(children: [
              Expanded(child: SinglePoseWidget(imageBytes: _referenceImageBytes!, pose: _referencePose!, skeletonColor: Colors.red, label: '参考图')),
              const SizedBox(width: 16),
              Expanded(child: ComparisonResultWidget(userImageBytes: _userImageBytes!, userPose: _userPose!, referencePose: _referencePose!, imageSize: _userImageSize!)),
            ]),
          )
        else
          Column(children: [
            SizedBox(height: 280, width: double.infinity, child: SinglePoseWidget(imageBytes: _referenceImageBytes!, pose: _referencePose!, skeletonColor: Colors.red, label: '参考图')),
            const SizedBox(height: 16),
            SizedBox(height: 280, width: double.infinity, child: ComparisonResultWidget(userImageBytes: _userImageBytes!, userPose: _userPose!, referencePose: _referencePose!, imageSize: _userImageSize!)),
          ]),

        const SizedBox(height: 24),

        // 造型分数
        ConstrainedBox(
          constraints: BoxConstraints(maxWidth: isWide ? 400 : double.infinity),
          child: ScoreWidget(score: _totalScore),
        ),

        const SizedBox(height: 24),

        // 详细角度分析
        if (_angleResults != null)
          ConstrainedBox(
            constraints: BoxConstraints(maxWidth: isWide ? 800 : double.infinity),
            child: AngleComparisonWidget(angles: _angleResults!),
          ),

        const SizedBox(height: 24),
        ElevatedButton.icon(onPressed: _reset, icon: const Icon(Icons.refresh), label: const Text('重新对比'), style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16))),
        const SizedBox(height: 24),
      ]),
    );
  }


  Widget _buildLegend() => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(8)),
    child: Row(mainAxisAlignment: MainAxisAlignment.center, children: [
      _legendItem(Colors.greenAccent, '你的姿态'),
      const SizedBox(width: 32),
      _legendItem(Colors.red, '参考角度（虚线）'),
    ]),
  );

  Widget _legendItem(Color c, String l) => Row(mainAxisSize: MainAxisSize.min, children: [
    Container(width: 24, height: 4, decoration: BoxDecoration(color: c, borderRadius: BorderRadius.circular(2))),
    const SizedBox(width: 8),
    Text(l, style: const TextStyle(fontSize: 14)),
  ]);

  Widget _buildInstructions() => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(8)),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Text('使用说明', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.grey.shade700)),
      const SizedBox(height: 8),
      Text('1. 上传一张标准参考图（如健美造型图）\n2. 上传你模仿该动作的照片\n3. 系统会自动检测姿态并计算造型分数\n4. 查看详细角度分析，了解需要改进的地方', style: TextStyle(color: Colors.grey.shade600, height: 1.5)),
    ]),
  );
}
