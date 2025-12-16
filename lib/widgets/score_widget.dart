import 'package:flutter/material.dart';
import '../services/angle_calculator.dart';

/// 造型分数显示组件
class ScoreWidget extends StatelessWidget {
  final double score;

  const ScoreWidget({super.key, required this.score});

  @override
  Widget build(BuildContext context) {
    final rating = getScoreRating(score);
    final color = _getScoreColor(score);

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(colors: [color.withOpacity(0.1), color.withOpacity(0.05)]),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(children: [
        const Text('造型评分', style: TextStyle(fontSize: 16, color: Colors.grey)),
        const SizedBox(height: 8),
        Row(mainAxisAlignment: MainAxisAlignment.center, children: [
          Text(score.toStringAsFixed(0), style: TextStyle(fontSize: 64, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(width: 4),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text('分', style: TextStyle(fontSize: 20, color: color)),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
              decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(4)),
              child: Text(rating, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
            ),
          ]),
        ]),
        const SizedBox(height: 12),
        Text(_getScoreComment(score), style: TextStyle(color: Colors.grey.shade600), textAlign: TextAlign.center),
      ]),
    );
  }

  Color _getScoreColor(double s) {
    if (s >= 90) return Colors.green;
    if (s >= 80) return Colors.lightGreen;
    if (s >= 70) return Colors.orange;
    if (s >= 60) return Colors.deepOrange;
    return Colors.red;
  }

  String _getScoreComment(double s) {
    if (s >= 90) return '姿态非常标准，继续保持！';
    if (s >= 80) return '姿态很好，细节可以再优化';
    if (s >= 70) return '姿态良好，注意关节角度';
    if (s >= 60) return '基本到位，多练习可以提升';
    return '需要多加练习，注意参考标准姿态';
  }
}
